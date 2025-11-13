export * from './analytics';
export * from './wallet';
export * from './settings';

// Common API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Energy data types
export interface EnergyData {
  date?: string;
  generated?: number;
  consumed?: number;
  sold?: number;
  earnings?: number;
  generation?: number;
  consumption?: number;
  surplus?: number;
  currentPrice?: number;
  todayEarnings?: number;
  todayCarbonOffset?: number;
}

export interface Device {
  deviceId: string;
  connectionStatus: 'Connected' | 'Offline' | 'Unknown';
}

export interface ImpactSummary {
  totalEarnings: number;
  totalSavings: number;
  co2Reduced: number;
}

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  PROSUMER = 'PROSUMER',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pincode: string;
  language: string;
  consumerId?: string;
  isBiometric: boolean;
  userType: UserType;
}
