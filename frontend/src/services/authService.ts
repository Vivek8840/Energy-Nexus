import { api } from './api';

export type SignUpPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  pincode: string;
  language?: string;
  agree?: boolean;
};

export type LoginPayload = {
  identifier: string; // email or phone
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    pincode: string;
    language: string;
  };
};

export const authService = {
  signUp: (payload: SignUpPayload) => api.post<AuthResponse>('/api/auth/signup', payload),
  login: (payload: LoginPayload) => api.post<AuthResponse>('/api/auth/login', payload),
  logout: () => api.post<{ success: true }>('/api/auth/logout'),
  requestPasswordReset: (emailOrPhone: string) => api.post<{ success: true }>('/api/auth/request-reset', { identifier: emailOrPhone }),
  resetPassword: (token: string, newPassword: string) => api.post<{ success: true }>('/api/auth/reset', { token, newPassword }),
  requestOtp: (phone: string) => api.post<{ success: true; otpSent: boolean }>('/api/auth/request-otp', { phone }),
  verifyOtp: (phone: string, otp: string) => api.post<AuthResponse>('/api/auth/verify-otp', { phone, otp }),
};
