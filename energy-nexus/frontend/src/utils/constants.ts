export const APP_CONFIG = {
  APP_NAME: 'EnergyNexus',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  WEBSOCKET_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:3001',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/app/dashboard',
  MARKETPLACE: '/app/marketplace',
  ANALYTICS: '/app/analytics',
  WALLET: '/app/wallet',
  SETTINGS: '/app/settings',
};

export const CHART_COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#3b82f6',
  ACCENT: '#f59e0b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
};

export const ENERGY_CONSTANTS = {
  CO2_PER_KWH: 0.82, // kg CO2 per kWh
  CO2_PER_TREE: 22, // kg CO2 absorbed per tree per year
  MIN_WITHDRAWAL: 100, // Minimum withdrawal amount in rupees
  MAX_WITHDRAWAL: 50000, // Maximum withdrawal amount in rupees
};