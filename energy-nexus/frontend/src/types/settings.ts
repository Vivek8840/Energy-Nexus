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
  systemAlerts: boolean;
  weeklyReports: boolean;
}

export interface SecuritySettings {
  biometricLogin: boolean;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}
