import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, UserSettings, NotificationSettings, SecuritySettings, UserPreferences, UserType } from '@/types';

interface UserState {
  user: User | null;
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_SETTINGS'; payload: UserSettings }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_USER' };

const initialState: UserState = {
  user: null,
  settings: null,
  isLoading: false,
  error: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, error: null };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'UPDATE_SETTINGS':
      return { 
        ...state, 
        settings: state.settings ? { ...state.settings, ...action.payload } : null 
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_USER':
      return initialState;
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  updateUser: (userData: Partial<User>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  updateSecurity: (security: Partial<SecuritySettings>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Initialize user settings with defaults and mock user
  useEffect(() => {
    const defaultSettings: UserSettings = {
      notifications: {
        saleConfirmations: true,
        priceAlerts: true,
        walletUpdates: true,
        promotionalMessages: false,
        energyInsights: true,
        maintenanceUpdates: true,
      },
      security: {
        biometricLogin: false,
        twoFactorAuth: false,
        loginAlerts: true,
        sessionTimeout: 30,
      },
      preferences: {
        language: 'en',
        currency: 'INR',
        timeZone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        theme: 'light',
      },
    };

    dispatch({ type: 'SET_SETTINGS', payload: defaultSettings });

    // Set mock user as PROSUMER
    const mockUser: User = {
      id: 'mock-user-id',
      fullName: 'Mock Prosumer',
      email: 'prosumer@example.com',
      phone: '+91-9876543210',
      pincode: '110001',
      language: 'en',
      consumerId: 'CONS001',
      isBiometric: false,
      userType: UserType.PROSUMER,
    };

    dispatch({ type: 'SET_USER', payload: mockUser });
  }, []);

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const updateSettings = (settings: Partial<UserSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const updateNotifications = (notifications: Partial<NotificationSettings>) => {
    if (state.settings) {
      dispatch({ 
        type: 'UPDATE_SETTINGS', 
        payload: { 
          ...state.settings, 
          notifications: { ...state.settings.notifications, ...notifications } 
        } 
      });
    }
  };

  const updateSecurity = (security: Partial<SecuritySettings>) => {
    if (state.settings) {
      dispatch({ 
        type: 'UPDATE_SETTINGS', 
        payload: { 
          ...state.settings, 
          security: { ...state.settings.security, ...security } 
        } 
      });
    }
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    if (state.settings) {
      dispatch({ 
        type: 'UPDATE_SETTINGS', 
        payload: { 
          ...state.settings, 
          preferences: { ...state.settings.preferences, ...preferences } 
        } 
      });
    }
  };

  const clearUser = () => {
    dispatch({ type: 'CLEAR_USER' });
  };

  return (
    <UserContext.Provider value={{
      state,
      updateUser,
      updateSettings,
      updateNotifications,
      updateSecurity,
      updatePreferences,
      clearUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};