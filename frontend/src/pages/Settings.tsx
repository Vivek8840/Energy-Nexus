import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, User, Zap, Globe, Bell, Shield, HelpCircle, FileText, LogOut, Camera, Edit, Phone, Mail, Lock, Fingerprint, ChevronRight, AlertCircle, CreditCard, Menu } from 'lucide-react';

// Import components
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';

// Types
interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  consumerID: string | null;
  isVerified: boolean;
}

interface SystemDetails {
  consumerID: string;
  systemSize: number;
  installationDate: string;
  inverterModel: string;
  isActive: boolean;
}

interface NotificationSettings {
  saleConfirmations: boolean;
  priceAlerts: boolean;
  walletUpdates: boolean;
  promotionalMessages: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
  energyUsageAlerts: boolean;
  maintenanceReminders: boolean;
  communityUpdates: boolean;
}

interface NotificationPreferences {
  method: 'push' | 'email' | 'sms' | 'all';
  frequency: 'immediate' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  priority: 'low' | 'medium' | 'high';
}

interface ThemeCustomization {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'default' | 'sans' | 'serif' | 'mono';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
}

interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  screenReader: boolean;
}

interface SecuritySettings {
  biometricLogin: boolean;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  accountType: 'savings' | 'current';
  upiId?: string;
}

const Settings: React.FC = () => {
  // State management
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false);

  const { theme, actualTheme, setTheme } = useTheme();
  const { state: authState, updateUser } = useAuth();
  const { state: userState, updateNotifications, updateSecurity, updatePreferences } = useUser();

  // User Profile State - derived from AuthContext
  const userProfile: UserProfile = {
    fullName: authState.user?.name || 'User',
    email: authState.user?.email || '',
    phoneNumber: authState.user?.phone ? `+91 ${authState.user.phone}` : '',
    profilePicture: authState.user?.profilePicture || null,
    consumerID: authState.user?.consumerId || null,
    isVerified: true // Assuming verified for now
  };

  // System Details State
  const [systemDetails, setSystemDetails] = useState<SystemDetails>({
    consumerID: '1234567890',
    systemSize: 5.5,
    installationDate: '2023-03-15',
    inverterModel: 'Luminous Solar NXG1100',
    isActive: true
  });

  // Notification Settings State - from UserContext
  const notificationSettings = userState.settings?.notifications || {
    saleConfirmations: true,
    priceAlerts: true,
    walletUpdates: true,
    promotionalMessages: false,
    systemAlerts: true,
    weeklyReports: true,
    energyUsageAlerts: true,
    maintenanceReminders: true,
    communityUpdates: false
  };

  // Notification Preferences State
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    method: 'all',
    frequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    },
    priority: 'medium'
  });

  // Security Settings State - from UserContext
  const securitySettings = userState.settings?.security || {
    biometricLogin: true,
    twoFactorAuth: false,
    loginAlerts: true
  };

  // Bank Details State
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    accountType: 'savings',
    upiId: ''
  });

  // Language State - from UserContext
  const selectedLanguage = userState.settings?.preferences?.language || 'en';

  // Theme Customization State
  const [themeCustomization, setThemeCustomization] = useState<ThemeCustomization>({
    primaryColor: '#10B981',
    secondaryColor: '#6B7280',
    accentColor: '#F59E0B',
    fontSize: 'medium',
    fontFamily: 'default',
    borderRadius: 'medium'
  });

  // Accessibility Settings State
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false
  });

  // Form States
  const [profileForm, setProfileForm] = useState({
    fullName: userProfile.fullName,
    dateOfBirth: '',
    gender: '',
    occupation: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  // Update profile form when user data changes
  useEffect(() => {
    setProfileForm(prev => ({
      ...prev,
      fullName: userProfile.fullName
    }));
  }, [userProfile.fullName]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [achievementProgress] = useState({
    profileCompletion: 80,
    tradingStreakDays: 5,
    carbonSavedKg: 128.4,
    greenPoints: 2450,
    level: 7,
    experienceToNext: 550,
    totalExperience: 2450
  });

  const [greenPointsHistory] = useState([
    { action: 'Energy Trade', points: 50, date: '2024-01-15', type: 'trade' },
    { action: 'Solar Panel Maintenance', points: 25, date: '2024-01-14', type: 'maintenance' },
    { action: 'CO₂ Reduction Goal', points: 100, date: '2024-01-13', type: 'carbon' },
    { action: 'Community Post', points: 10, date: '2024-01-12', type: 'social' },
    { action: 'Weekly Report', points: 15, date: '2024-01-11', type: 'report' }
  ]);

  const badges = [
    { title: 'Getting Started', desc: 'Completed profile setup', color: 'from-green-400 to-emerald-500', earned: true, points: 100, icon: '🌱' },
    { title: 'Green Saver', desc: 'Saved 100kg CO₂', color: 'from-blue-400 to-indigo-500', earned: true, points: 250, icon: '🌍' },
    { title: 'First Trade', desc: 'Completed first energy sale', color: 'from-yellow-400 to-amber-500', earned: true, points: 150, icon: '⚡' },
    { title: 'Seller Pro', desc: 'Sold 100 kWh', color: 'from-pink-400 to-rose-500', earned: false, points: 500, icon: '🏆' },
    { title: 'Carbon Warrior', desc: 'Saved 500kg CO₂', color: 'from-purple-400 to-violet-500', earned: false, points: 750, icon: '🛡️' },
    { title: 'Community Leader', desc: 'Helped 10 community members', color: 'from-orange-400 to-red-500', earned: false, points: 300, icon: '👥' },
    { title: 'Maintenance Master', desc: 'Completed 50 maintenance tasks', color: 'from-cyan-400 to-blue-500', earned: false, points: 400, icon: '🔧' },
    { title: 'Energy Champion', desc: 'Traded 1000 kWh', color: 'from-emerald-400 to-teal-500', earned: false, points: 1000, icon: '⭐' }
  ];

  const levelRewards = [
    { level: 1, reward: 'Basic Profile Badge', points: 100 },
    { level: 3, reward: 'Green Ambassador Title', points: 300 },
    { level: 5, reward: 'Priority Support', points: 500 },
    { level: 7, reward: 'Exclusive Community Access', points: 700 },
    { level: 10, reward: 'Premium Features', points: 1000 }
  ];

  // Language options
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
  ];



  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) newErrors.newPassword = 'New password is required';
    else if (passwordForm.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters long';
    if (passwordForm.newPassword !== passwordForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = () => {
    if (!profileForm.fullName.trim()) {
      setErrors({ fullName: 'Name is required' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      updateUser({ name: profileForm.fullName });
      setErrors({});
      setIsLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (!validatePasswordForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
      setErrors({});
      setIsLoading(false);
      alert('Password changed successfully!');
    }, 1500);
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateUser({
          profilePicture: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationToggle = (setting: keyof NotificationSettings) => {
    const currentValue = notificationSettings[setting];
    updateNotifications({ [setting]: !currentValue });
  };

  const handleSaveNotificationPreferences = () => {
    // In a real app, this would save to backend
    alert('Notification preferences saved successfully!');
  };

  const handleSaveAppearanceSettings = () => {
    // In a real app, this would save theme customization and accessibility settings to backend
    alert('Appearance settings saved successfully!');
  };

  const handleSecurityToggle = (setting: keyof SecuritySettings) => {
    const currentValue = securitySettings[setting];
    updateSecurity({ [setting]: !currentValue });
  };

  const handleLanguageChange = (langCode: string) => {
    updatePreferences({ language: langCode });
    alert(`Language changed to ${languages.find(l => l.code === langCode)?.nativeName}`);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logout functionality would be implemented here');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would trigger account deletion
      alert('Account deletion would be processed');
      setShowDeleteAccount(false);
    }
  };

  const ProfileSection = () => (
    <Card>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profile Information</h3>
        </div>
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          {userProfile.profilePicture ? (
            <img
              src={userProfile.profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 dark:bg-dark-700 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
          )}
          <label className="absolute -bottom-2 -right-2 p-2 bg-green-600 rounded-full text-white cursor-pointer hover:bg-green-700 transition-colors">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{userProfile.fullName}</h4>
          <p className="text-gray-600 dark:text-gray-400">{userProfile.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">Verified Account</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Input
          label="Full Name"
          value={profileForm.fullName}
          onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
          error={errors.fullName}
          icon={<Edit className="w-4 h-4" />}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="text"
            value={profileForm.dateOfBirth}
            onChange={(e) => setProfileForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <select
              value={profileForm.gender}
              onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
        <Input
          label="Occupation"
          value={profileForm.occupation}
          onChange={(e) => setProfileForm(prev => ({ ...prev, occupation: e.target.value }))}
          placeholder="e.g., Software Engineer"
        />
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Address</h4>
          <Input
            label="Street Address"
            value={profileForm.address.street}
            onChange={(e) => setProfileForm(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
            placeholder="Street address"
          />
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={profileForm.address.city}
              onChange={(e) => setProfileForm(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
              placeholder="City"
            />
            <Input
              label="State"
              value={profileForm.address.state}
              onChange={(e) => setProfileForm(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
              placeholder="State"
            />
            <Input
              label="PIN Code"
              value={profileForm.address.pincode}
              onChange={(e) => setProfileForm(prev => ({ ...prev, address: { ...prev.address, pincode: e.target.value } }))}
              placeholder="PIN code"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-300">{userProfile.email}</span>
              <span className="ml-auto text-xs text-gray-500">Contact support to change</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-300">{userProfile.phoneNumber}</span>
              <span className="ml-auto text-xs text-gray-500">Contact support to change</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleProfileUpdate} loading={isLoading}>
            Update Profile
          </Button>
        </div>
      </div>
      </div>
    </Card>
  );

  const SystemSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">My Solar System</h3>
      </div>
      {userProfile.consumerID ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Consumer ID</h4>
              <p className="text-green-700 dark:text-green-300 font-mono">{systemDetails.consumerID}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">System Size</h4>
              <p className="text-blue-700 dark:text-blue-300">{systemDetails.systemSize} kW</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Installation Date</h4>
              <p className="text-gray-700 dark:text-gray-300">{new Date(systemDetails.installationDate).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Inverter Model</h4>
              <p className="text-purple-700 dark:text-purple-300">{systemDetails.inverterModel}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">System Status</h4>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${systemDetails.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${systemDetails.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {systemDetails.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Update Details
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No Solar System Linked</h4>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Connect your solar system to start earning from surplus energy</p>
          <Button>Link Solar System</Button>
        </div>
      )}
    </Card>
  );

  const NotificationsSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Notification Preferences</h3>
      </div>

      {/* Notification Method and Frequency */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notification Method</label>
          <select
            value={notificationPreferences.method}
            onChange={(e) => setNotificationPreferences(prev => ({ ...prev, method: e.target.value as NotificationPreferences['method'] }))}
            className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="push">Push Notifications</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="all">All Methods</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Frequency</label>
          <select
            value={notificationPreferences.frequency}
            onChange={(e) => setNotificationPreferences(prev => ({ ...prev, frequency: e.target.value as NotificationPreferences['frequency'] }))}
            className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="immediate">Immediate</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Summary</option>
          </select>
        </div>
      </div>

      {/* Priority Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority Level</label>
        <div className="flex gap-3">
          {(['low', 'medium', 'high'] as const).map((priority) => (
            <button
              key={priority}
              onClick={() => setNotificationPreferences(prev => ({ ...prev, priority }))}
              className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                notificationPreferences.priority === priority
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="mb-6 p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Quiet Hours</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pause notifications during specified hours</p>
          </div>
          <button
            onClick={() => setNotificationPreferences(prev => ({
              ...prev,
              quietHours: { ...prev.quietHours, enabled: !prev.quietHours.enabled }
            }))}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              notificationPreferences.quietHours.enabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform top-1 ${
              notificationPreferences.quietHours.enabled ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </button>
        </div>
        {notificationPreferences.quietHours.enabled && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
              <input
                type="time"
                value={notificationPreferences.quietHours.start}
                onChange={(e) => setNotificationPreferences(prev => ({
                  ...prev,
                  quietHours: { ...prev.quietHours, start: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time</label>
              <input
                type="time"
                value={notificationPreferences.quietHours.end}
                onChange={(e) => setNotificationPreferences(prev => ({
                  ...prev,
                  quietHours: { ...prev.quietHours, end: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Individual Notification Types */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notification Types</h4>
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {key === 'saleConfirmations' && 'Get notified when your energy is sold'}
                {key === 'priceAlerts' && 'Alerts when energy prices change significantly'}
                {key === 'walletUpdates' && 'Updates about your wallet balance and transactions'}
                {key === 'promotionalMessages' && 'Marketing messages and special offers'}
                {key === 'systemAlerts' && 'Important alerts about your solar system'}
                {key === 'weeklyReports' && 'Weekly performance and earnings summary'}
                {key === 'energyUsageAlerts' && 'Alerts about unusual energy consumption patterns'}
                {key === 'maintenanceReminders' && 'Reminders for system maintenance and cleaning'}
                {key === 'communityUpdates' && 'Updates from the EnergyNexus community'}
              </p>
            </div>
            <button
              onClick={() => handleNotificationToggle(key as keyof NotificationSettings)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                value ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform top-1 ${
                value ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>

      {/* Save Preferences Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveNotificationPreferences}>
          Save Preferences
        </Button>
      </div>
    </Card>
  );

  const SecuritySection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Security Settings</h3>
      </div>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setShowChangePassword(true)}>
              Change
            </Button>
          </div>
        </div>
        {Object.entries(securitySettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
            <div className="flex items-center gap-3">
              {key === 'biometricLogin' && <Fingerprint className="w-5 h-5 text-gray-600" />}
              {key === 'twoFactorAuth' && <Shield className="w-5 h-5 text-gray-600" />}
              {key === 'loginAlerts' && <Bell className="w-5 h-5 text-gray-600" />}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {key === 'biometricLogin' && 'Use fingerprint or face ID to login'}
                  {key === 'twoFactorAuth' && 'Add an extra layer of security to your account'}
                  {key === 'loginAlerts' && 'Get notified of new device logins'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSecurityToggle(key as keyof SecuritySettings)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                value ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform top-1 ${
                value ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );

  const LanguageSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Language & Appearance</h3>
      </div>

      {/* Language Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Language</h4>
        <div className="grid gap-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedLanguage === language.code
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{language.nativeName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language.name}</p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme</h4>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => {
              setTheme('light');
              updatePreferences({ theme: 'light' });
            }}
            className={`px-4 py-3 rounded-lg border transition-colors ${
              theme === 'light' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              updatePreferences({ theme: 'dark' });
            }}
            className={`px-4 py-3 rounded-lg border transition-colors ${
              theme === 'dark' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
          >
            Dark
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Current: {actualTheme} mode</p>
      </div>

      {/* Theme Customization */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme Customization</h4>

        {/* Color Customization */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
            <input
              type="color"
              value={themeCustomization.primaryColor}
              onChange={(e) => setThemeCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="w-full h-10 border border-gray-200 dark:border-dark-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary Color</label>
            <input
              type="color"
              value={themeCustomization.secondaryColor}
              onChange={(e) => setThemeCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
              className="w-full h-10 border border-gray-200 dark:border-dark-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accent Color</label>
            <input
              type="color"
              value={themeCustomization.accentColor}
              onChange={(e) => setThemeCustomization(prev => ({ ...prev, accentColor: e.target.value }))}
              className="w-full h-10 border border-gray-200 dark:border-dark-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Font and Layout Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
            <select
              value={themeCustomization.fontSize}
              onChange={(e) => setThemeCustomization(prev => ({ ...prev, fontSize: e.target.value as ThemeCustomization['fontSize'] }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</label>
            <select
              value={themeCustomization.fontFamily}
              onChange={(e) => setThemeCustomization(prev => ({ ...prev, fontFamily: e.target.value as ThemeCustomization['fontFamily'] }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="default">Default</option>
              <option value="sans">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="mono">Monospace</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Border Radius</label>
          <div className="flex gap-3">
            {(['none', 'small', 'medium', 'large'] as const).map((radius) => (
              <button
                key={radius}
                onClick={() => setThemeCustomization(prev => ({ ...prev, borderRadius: radius }))}
                className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                  themeCustomization.borderRadius === radius
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                {radius}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Accessibility</h4>
        <div className="space-y-4">
          {Object.entries(accessibilitySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {key === 'highContrast' && 'Increase contrast for better visibility'}
                  {key === 'reducedMotion' && 'Reduce animations and transitions'}
                  {key === 'largeText' && 'Increase text size for better readability'}
                  {key === 'screenReader' && 'Optimize for screen reader compatibility'}
                </p>
              </div>
              <button
                onClick={() => setAccessibilitySettings(prev => ({ ...prev, [key]: !value }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform top-1 ${
                  value ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveAppearanceSettings}>
          Save Settings
        </Button>
      </div>
    </Card>
  );

  const SupportSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Help & Support</h3>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-green-600" />
              <h5 className="font-semibold text-green-800 dark:text-green-300">Phone Support</h5>
            </div>
            <p className="text-green-700 dark:text-green-300 font-mono text-lg">+91 78977 27565</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h5 className="font-semibold text-blue-800 dark:text-blue-300">Email Support</h5>
            </div>
            <p className="text-blue-700 dark:text-blue-300 font-mono">energynexus@email.com</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Response within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Quick Help Options */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Help</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <h5 className="font-semibold text-gray-900 dark:text-gray-100">Live Chat</h5>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Chat with our support team instantly</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Online Now
              </span>
            </div>
          </button>
          <button className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <h5 className="font-semibold text-gray-900 dark:text-gray-100">Submit Ticket</h5>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create a support ticket for detailed assistance</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                Avg. 2hr response
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Support Resources */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Support Resources</h4>
        <div className="space-y-3">
          {[
            { title: 'Frequently Asked Questions', desc: 'Find answers to common questions', icon: HelpCircle, color: 'text-blue-600' },
            { title: 'User Guide & Documentation', desc: 'Comprehensive guides and tutorials', icon: FileText, color: 'text-green-600' },
            { title: 'Video Tutorials', desc: 'Step-by-step video guides', icon: Zap, color: 'text-purple-600' },
            { title: 'API Documentation', desc: 'Technical documentation for developers', icon: SettingsIcon, color: 'text-orange-600' },
            { title: 'Community Forum', desc: 'Connect with other users and experts', icon: User, color: 'text-pink-600' },
            { title: 'System Status', desc: 'Check service availability and updates', icon: Shield, color: 'text-red-600' }
          ].map((item, index) => (
            <button key={index} className="w-full p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Popular Topics</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'How to sell excess solar energy?',
            'Setting up payment methods',
            'Understanding energy pricing',
            'Solar system integration',
            'Account verification process',
            'Troubleshooting connection issues'
          ].map((topic, index) => (
            <button key={index} className="p-3 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{topic}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Social Media & Community */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect With Us</h4>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Twitter', icon: '🐦', color: 'bg-blue-500 hover:bg-blue-600' },
            { name: 'Facebook', icon: '📘', color: 'bg-blue-600 hover:bg-blue-700' },
            { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700 hover:bg-blue-800' },
            { name: 'YouTube', icon: '📺', color: 'bg-red-600 hover:bg-red-700' },
            { name: 'Instagram', icon: '📷', color: 'bg-pink-600 hover:bg-pink-700' },
            { name: 'Discord', icon: '💬', color: 'bg-indigo-600 hover:bg-indigo-700' }
          ].map((social, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${social.color}`}
            >
              <span>{social.icon}</span>
              <span className="text-sm font-medium">{social.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h5 className="font-semibold text-red-800 dark:text-red-300 mb-1">Emergency Support</h5>
            <p className="text-sm text-red-700 dark:text-red-300 mb-2">
              For urgent technical issues or system outages, contact our emergency hotline:
            </p>
            <p className="text-red-800 dark:text-red-300 font-mono font-semibold">+91 78977 27565</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">Available 24/7 for critical issues</p>
          </div>
        </div>
      </div>
    </Card>
  );

  const LegalSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Legal & About</h3>
      </div>
      <div className="space-y-3">
        {[{ title: 'About EnergyNexus', desc: 'Learn about our mission and vision' },{ title: 'Privacy Policy', desc: 'How we handle your data' },{ title: 'Terms of Service', desc: 'Terms and conditions of use' },{ title: 'Data Protection', desc: 'Your data rights and protections' },{ title: 'Licenses', desc: 'Third-party licenses and attributions' }].map((item, index) => (
          <button key={index} className="w-full p-4 border border-gray-200 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors text-left">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-red-600">Delete Account</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and data</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setShowDeleteAccount(true)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );

  const BankDetailsSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bank Details</h3>
      </div>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Bank Name"
            value={bankDetails.bankName}
            onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
            placeholder="e.g., State Bank of India"
          />
          <Input
            label="Account Holder Name"
            value={bankDetails.accountHolderName}
            onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
            placeholder="Full name as per bank records"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Account Number"
            value={bankDetails.accountNumber}
            onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
            placeholder="Enter your account number"
          />
          <Input
            label="IFSC Code"
            value={bankDetails.ifscCode}
            onChange={(e) => setBankDetails(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
            placeholder="e.g., SBIN0001234"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Branch Name"
            value={bankDetails.branchName}
            onChange={(e) => setBankDetails(prev => ({ ...prev, branchName: e.target.value }))}
            placeholder="Branch location"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Type</label>
            <select
              value={bankDetails.accountType}
              onChange={(e) => setBankDetails(prev => ({ ...prev, accountType: e.target.value as 'savings' | 'current' }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="savings">Savings Account</option>
              <option value="current">Current Account</option>
            </select>
          </div>
        </div>
        <Input
          label="UPI ID (Optional)"
          value={bankDetails.upiId}
          onChange={(e) => setBankDetails(prev => ({ ...prev, upiId: e.target.value }))}
          placeholder="e.g., yourname@upi"
        />
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">Important Security Notice</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Your bank details are encrypted and stored securely. We use this information only for energy trading settlements and payouts. Never share your banking details with anyone else.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => alert('Bank details saved successfully!')}>
            Save Bank Details
          </Button>
        </div>
      </div>
    </Card>
  );

  const AchievementsSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Achievements & Progress</h3>
      </div>

      {/* Progress Bars */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Profile Completion</p>
          <p className="text-2xl font-bold text-green-600">{achievementProgress.profileCompletion}%</p>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
            <motion.div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${achievementProgress.profileCompletion}%` }} />
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Trading Streak</p>
          <p className="text-2xl font-bold text-blue-600">{achievementProgress.tradingStreakDays} days</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Keep it up to unlock badges</p>
        </div>
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved</p>
          <p className="text-2xl font-bold text-emerald-600">{achievementProgress.carbonSavedKg.toFixed(1)} kg</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Trees equivalent: {(achievementProgress.carbonSavedKg / 21).toFixed(1)}</p>
        </div>
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">Green Points</p>
          <p className="text-2xl font-bold text-green-700">{achievementProgress.greenPoints}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Level {achievementProgress.level}</p>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
            <motion.div className="h-2 bg-gradient-to-r from-green-500 to-green-700" initial={{ width: 0 }} animate={{ width: `${(achievementProgress.totalExperience / (achievementProgress.totalExperience + achievementProgress.experienceToNext)) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Next level in {achievementProgress.experienceToNext} points</p>
        </div>
      </div>

      {/* Badges */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`relative p-4 rounded-2xl border border-white/20 bg-gradient-to-br ${b.color} text-white overflow-hidden`}>
            <div className={`absolute -inset-1 ${b.earned ? 'opacity-60' : 'opacity-0'} rounded-2xl`} style={{ boxShadow: b.earned ? '0 0 28px rgba(255,255,255,0.35)' : 'none' }} />
            <div className="relative flex items-center gap-2">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <h4 className="font-semibold">{b.title}</h4>
                <p className="text-sm opacity-90">{b.desc}</p>
                <div className="mt-3 text-xs font-medium">
                  {b.earned ? `Unlocked (${b.points} pts)` : `Locked (${b.points} pts)`}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Green Points History */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Green Points History</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {greenPointsHistory.map((entry, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{entry.action}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(entry.date).toLocaleDateString()}</p>
              </div>
              <div className={`text-sm font-semibold ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {entry.points > 0 ? `+${entry.points}` : entry.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Rewards */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Level Rewards</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {levelRewards.map((reward) => (
            <div key={reward.level} className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100">Level {reward.level}</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">{reward.reward}</p>
              <p className="text-xs text-green-600 font-semibold">{reward.points} pts required</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bank', label: 'Bank Details', icon: CreditCard },
    { id: 'system', label: 'My System', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'language', label: 'Language & Theme', icon: Globe },
    { id: 'achievements', label: 'Achievements', icon: User },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
    { id: 'legal', label: 'Legal & About', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account and preferences</p>
              </div>
            </div>
            <Button variant="danger" onClick={handleLogout} className="hidden sm:flex">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        <div className="flex gap-8">
          {/* Sidebar Area */}
          <div className="relative flex-shrink-0 sticky top-6 h-fit">
            {/* Settings Toggle Button - Always visible at top */}
            <div className="mb-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle Settings Sidebar"
                className="p-2 rounded-xl glass hover:backdrop-blur-md transition-all duration-300"
              >
                <SettingsIcon className="w-6 h-6 text-primary-600" />
              </button>
            </div>

            {/* Sidebar */}
            <motion.div
              animate={{ width: isSidebarOpen ? '280px' : '80px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="h-fit"
            >
              <Card className={isSidebarOpen ? '' : 'w-fit'}>
                <nav className={`space-y-1 ${isSidebarOpen ? '' : 'flex flex-col items-center'}`}>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          // Don't auto-close on mobile for collapsed state
                        }}
                        className={`${
                          isSidebarOpen
                            ? 'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors'
                            : 'p-3 rounded-lg transition-colors'
                        } ${
                          activeSection === item.id
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                        }`}
                        title={!isSidebarOpen ? item.label : undefined} // Tooltip only for collapsed state
                      >
                        <Icon className="w-5 h-5" />
                        {isSidebarOpen && <span>{item.label}</span>}
                      </button>
                    );
                  })}
                  <hr className="my-4" />
                  <button
                    onClick={handleLogout}
                    className={`${
                      isSidebarOpen
                        ? 'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 lg:hidden'
                        : 'p-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 lg:hidden'
                    }`}
                    title={!isSidebarOpen ? 'Logout' : undefined}
                  >
                    <LogOut className="w-5 h-5" />
                    {isSidebarOpen && <span>Logout</span>}
                  </button>
                </nav>
              </Card>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <>
              {activeSection === 'profile' && <ProfileSection />}
              {activeSection === 'bank' && <BankDetailsSection />}
              {activeSection === 'system' && <SystemSection />}
              {activeSection === 'notifications' && <NotificationsSection />}
              {activeSection === 'security' && <SecuritySection />}
              {activeSection === 'language' && <LanguageSection />}
              {activeSection === 'achievements' && <AchievementsSection />}
              {activeSection === 'support' && <SupportSection />}
              {activeSection === 'legal' && <LegalSection />}
            </>
          </div>
        </div>
        {showChangePassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Change Password</h3>
              </div>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  error={errors.currentPassword}
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  error={errors.newPassword}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  error={errors.confirmPassword}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowChangePassword(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setErrors({});
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handlePasswordChange} loading={isLoading} className="flex-1">
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        )}
        {showDeleteAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 w-full max-w-md">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Delete Account</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setShowDeleteAccount(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="danger" onClick={() => setShowDeleteAccount(false)} className="flex-1">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
