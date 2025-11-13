import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateOTP, verifyOTP } from '../utils/otpUtil.js';
import { sendOTPSMS } from '../services/smsService.js';
import { sendOTPEmail } from '../services/emailService.js';

const router = express.Router();

// Default user credentials
const DEFAULT_USERS = [
  {
    email: 'PowerPool@energynexus.com',
    phone: '8840776158',
    password: 'powerpool@login',
    name: 'PowerPool Admin'
  }
];

// Initialize default users
const initializeDefaultUsers = async () => {
  try {
    for (const defaultUser of DEFAULT_USERS) {
      const existingUser = await User.findOne({ 
        $or: [{ email: defaultUser.email }, { phone: defaultUser.phone }] 
      });
      
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(defaultUser.password, 12);
        await User.create({
          ...defaultUser,
          password: hashedPassword,
          pincode: '110001',
          isVerified: true,
          isProsumer: true
        });
        console.log(`Default user created: ${defaultUser.email}`);
      }
    }
  } catch (error) {
    console.error('Error initializing default users:', error);
  }
};

// Initialize on module load
initializeDefaultUsers();

// Validation middleware
const signupValidation = [
  body('fullName')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('pincode')
    .matches(/^\d{6}$/)
    .withMessage('Please provide a valid 6-digit pincode')
];

const loginValidation = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or phone is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// @route   POST /api/auth/signup
// @desc    Register user and send OTP
// @access  Public
router.post('/signup', signupValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { fullName, email, phone, password, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this email or phone number'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      pincode,
      otp,
      otpExpiry,
      isVerified: false
    });

    await user.save();

    // Send OTP via SMS
    try {
      await sendOTPSMS(phone, otp);
    } catch (smsError) {
      console.error('SMS sending failed:', smsError);
      // Don't fail registration if SMS fails
    }

    // Send OTP via Email
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully. OTP sent to your phone and email.',
      data: {
        userId: user._id,
        phone: phone.replace(/(\d{6})(\d{4})/, '$1****'),
        email: email.replace(/(.{2}).+(@.+)/, '$1***$2')
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and activate account
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        error: 'User ID and OTP are required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'User already verified'
      });
    }

    // Check OTP validity
    if (user.otp !== otp || new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    // Verify user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Account verified successfully',
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          isProsumer: user.isProsumer,
          isVerified: user.isVerified
        }
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { identifier, password } = req.body;

    // Find user by email or phone
    const isEmail = identifier.includes('@');
    const query = isEmail ? { email: identifier } : { phone: identifier };

    const user = await User.findOne(query);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // For default user, auto-verify if not verified
    if (!user.isVerified) {
      if (user.email === 'PowerPool@energynexus.com' || user.phone === '8840776158') {
        user.isVerified = true;
        await user.save();
        console.log('Auto-verified default user:', user.email);
      } else {
        return res.status(403).json({
          success: false,
          error: 'Account not verified. Please verify your account.',
          requiresVerification: true,
          userId: user._id
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          pincode: user.pincode,
          isProsumer: user.isProsumer,
          isVerified: user.isVerified,
          profilePicture: user.profilePicture,
          consumerId: user.consumerId
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/resend-otp
// @desc    Resend OTP
// @access  Public
router.post('/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'User already verified'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via SMS and Email
    try {
      await sendOTPSMS(user.phone, otp);
      await sendOTPEmail(user.email, otp);
    } catch (error) {
      console.error('OTP sending failed:', error);
    }

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset OTP
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({
        success: false,
        error: 'Email or phone is required'
      });
    }

    // Find user by email or phone
    const isEmail = identifier.includes('@');
    const query = isEmail ? { email: identifier } : { phone: identifier };
    
    const user = await User.findOne(query);

    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        success: true,
        message: 'If an account exists with this identifier, you will receive an OTP.'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.passwordResetOTP = otp;
    user.passwordResetExpiry = otpExpiry;
    await user.save();

    // Send OTP
    try {
      if (isEmail) {
        await sendOTPEmail(user.email, otp, 'Password Reset');
      } else {
        await sendOTPSMS(user.phone, otp);
      }
    } catch (error) {
      console.error('Password reset OTP sending failed:', error);
    }

    res.json({
      success: true,
      message: 'If an account exists with this identifier, you will receive an OTP.',
      userId: user._id // Only for development
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with OTP
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'User ID, OTP, and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Verify OTP
    if (user.passwordResetOTP !== otp || new Date() > user.passwordResetExpiry) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordResetOTP = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          pincode: user.pincode,
          isProsumer: user.isProsumer,
          isVerified: user.isVerified,
          profilePicture: user.profilePicture,
          consumerId: user.consumerId,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
});

export default router;
