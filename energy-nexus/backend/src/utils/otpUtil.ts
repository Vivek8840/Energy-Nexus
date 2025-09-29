// Simple OTP utility functions for development
export const generateOTP = (): string => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const verifyOTP = (otp: string, storedOTP: string): boolean => {
  return otp === storedOTP;
};
