import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  pincode: string;
  profilePicture?: string;
  consumerId?: string;
  isProsumer: boolean;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  passwordResetOTP?: string;
  passwordResetExpiry?: Date;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
  settings: {
    notifications: {
      saleConfirmations: boolean;
      priceAlerts: boolean;
      walletUpdates: boolean;
      promotionalMessages: boolean;
      energyInsights: boolean;
      maintenanceUpdates: boolean;
    };
    security: {
      biometricLogin: boolean;
      twoFactorAuth: boolean;
      loginAlerts: boolean;
      sessionTimeout: number;
    };
    preferences: {
      language: string;
      currency: string;
      timeZone: string;
      dateFormat: string;
      theme: 'light' | 'dark' | 'auto';
    };
  };
  walletBalance: number;
  totalEarnings: number;
  totalEnergySold: number;
  carbonOffsetTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
  },
  profilePicture: {
    type: String,
    default: ''
  },
  consumerId: {
    type: String,
    sparse: true,
    unique: true,
    trim: true
  },
  isProsumer: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    sparse: true
  },
  otpExpiry: {
    type: Date,
    sparse: true
  },
  passwordResetOTP: {
    type: String,
    sparse: true
  },
  passwordResetExpiry: {
    type: Date,
    sparse: true
  },
  biometricEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  settings: {
    notifications: {
      saleConfirmations: { type: Boolean, default: true },
      priceAlerts: { type: Boolean, default: true },
      walletUpdates: { type: Boolean, default: true },
      promotionalMessages: { type: Boolean, default: false },
      energyInsights: { type: Boolean, default: true },
      maintenanceUpdates: { type: Boolean, default: true }
    },
    security: {
      biometricLogin: { type: Boolean, default: false },
      twoFactorAuth: { type: Boolean, default: false },
      loginAlerts: { type: Boolean, default: true },
      sessionTimeout: { type: Number, default: 30 }
    },
    preferences: {
      language: { type: String, default: 'en' },
      currency: { type: String, default: 'INR' },
      timeZone: { type: String, default: 'Asia/Kolkata' },
      dateFormat: { type: String, default: 'DD/MM/YYYY' },
      theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' }
    }
  },
    walletBalance: {
    type: Number,
    default: 0,
    min: [0, 'Wallet balance cannot be negative']   
    },
    totalEarnings: {
    type: Number,
    default: 0,
    min: [0, 'Total earnings cannot be negative']   
    },  
    totalEnergySold: {
    type: Number,
    default: 0,
    min: [0, 'Total energy sold cannot be negative']    
    },
    carbonOffsetTotal: {
    type: Number,
    default: 0,
    min: [0, 'Carbon offset total cannot be negative']    
    },
}, { timestamps: true });
