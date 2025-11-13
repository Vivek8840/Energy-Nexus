export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  consumerID: string | null;
  isVerified: boolean;
}

export interface SystemDetails {
  consumerID: string;
  systemSize: number;
  installationDate: string;
  inverterModel: string;
  isActive: boolean;
}

export interface NotificationSettings {
  saleConfirmations: boolean;
  priceAlerts: boolean;
  walletUpdates: boolean;
  promotionalMessages: boolean;
  energyInsights: boolean;
  maintenanceUpdates: boolean;
}

export interface SecuritySettings {
  biometricLogin: boolean;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export interface UserPreferences {
  language: string;
  currency: string;
  timeZone: string;
  dateFormat: string;
  theme: string;
}

export interface UserSettings {
  notifications: NotificationSettings;
  security: SecuritySettings;
  preferences: UserPreferences;
}
