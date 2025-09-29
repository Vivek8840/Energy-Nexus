import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, User, Zap, Globe, Bell, Shield, HelpCircle, FileText, LogOut, Camera, Edit, Phone, Mail, Lock, Fingerprint, ChevronRight, AlertCircle } from 'lucide-react';

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
}

interface SecuritySettings {
  biometricLogin: boolean;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

const Settings: React.FC = () => {
  // State management
  const [activeSection, setActiveSection] = useState<string>('profile');
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
    weeklyReports: true
  };

  // Security Settings State - from UserContext
  const securitySettings = userState.settings?.security || {
    biometricLogin: true,
    twoFactorAuth: false,
    loginAlerts: true
  };

  // Language State - from UserContext
  const selectedLanguage = userState.settings?.preferences?.language || 'en';
  
  // Form States
  const [profileForm, setProfileForm] = useState({
    fullName: userProfile.fullName
  });

  // Update profile form when user data changes
  useEffect(() => {
    setProfileForm({ fullName: userProfile.fullName });
  }, [userProfile.fullName]);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [achievementProgress] = useState({ profileCompletion: 80, tradingStreakDays: 5, carbonSavedKg: 128.4 });
  const badges = [
    { title: 'Getting Started', desc: 'Completed profile setup', color: 'from-green-400 to-emerald-500', earned: true },
    { title: 'Green Saver', desc: 'Saved 100kg CO₂', color: 'from-blue-400 to-indigo-500', earned: true },
    { title: 'First Trade', desc: 'Completed first energy sale', color: 'from-yellow-400 to-amber-500', earned: false },
    { title: 'Seller Pro', desc: 'Sold 100 kWh', color: 'from-pink-400 to-rose-500', earned: false }
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

  useEffect(() => {
    setProfileForm({ fullName: userProfile.fullName });
  }, [userProfile]);

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
      <div className="space-y-4">
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
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Language & Theme</h3>
      </div>
      <div className="grid gap-2 mb-6">
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
      {/* Theme Selector */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme</h4>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setTheme('light');
              updatePreferences({ theme: 'light' });
            }}
            className={`px-4 py-2 rounded-lg border transition-colors ${
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
            className={`px-4 py-2 rounded-lg border transition-colors ${
              theme === 'dark' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => {
              setTheme('auto');
              updatePreferences({ theme: 'auto' });
            }}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              theme === 'auto' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
          >
            Auto
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Current: {actualTheme} mode</p>
      </div>
    </Card>
  );

  const SupportSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Help & Support</h3>
      </div>
      <div className="space-y-3">
        {[{ title: 'Frequently Asked Questions', desc: 'Find answers to common questions' },{ title: 'Contact Support', desc: 'Get help from our support team' },{ title: 'User Guide', desc: 'Learn how to use EnergyNexus' },{ title: 'Video Tutorials', desc: 'Watch step-by-step guides' },{ title: 'Community Forum', desc: 'Connect with other users' }].map((item, index) => (
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

  const AchievementsSection = () => (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Achievements & Progress</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Profile Completion</p>
          <p className="text-2xl font-bold text-green-600">{achievementProgress.profileCompletion}%</p>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-3">
            <motion.div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${achievementProgress.profileCompletion}%` }} />
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Trading Streak</p>
          <p className="text-2xl font-bold text-blue-600">{achievementProgress.tradingStreakDays} days</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Keep it up to unlock badges</p>
        </div>
        <div className="p-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved</p>
          <p className="text-2xl font-bold text-emerald-600">{achievementProgress.carbonSavedKg.toFixed(1)} kg</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Trees equivalent: {(achievementProgress.carbonSavedKg / 21).toFixed(1)}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`relative p-4 rounded-2xl border border-white/20 bg-gradient-to-br ${b.color} text-white overflow-hidden`}>
            <div className={`absolute -inset-1 ${b.earned ? 'opacity-60' : 'opacity-0'} rounded-2xl`} style={{ boxShadow: b.earned ? '0 0 28px rgba(255,255,255,0.35)' : 'none' }} />
            <div className="relative">
              <h4 className="font-semibold">{b.title}</h4>
              <p className="text-sm opacity-90">{b.desc}</p>
              <div className="mt-3 text-xs font-medium">
                {b.earned ? 'Unlocked' : 'Locked'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: User },
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
        <div className="grid lg:grid-cols-4 gap-8">
          <Card className="lg:col-span-1 h-fit">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
              <hr className="my-4" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 lg:hidden"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </Card>
          <div className="lg:col-span-3">
            <>
              {activeSection === 'profile' && <ProfileSection />}
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