import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '@/types';
import { authService, AuthResponse } from '@/services/authService';

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return { user: action.payload, isAuthenticated: true, isLoading: false };
    case 'LOGIN_FAILURE':
      return { user: null, isAuthenticated: false, isLoading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false };
    case 'UPDATE_USER':
      return state.user ? { ...state, user: { ...state.user, ...action.payload } } : state;
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('energynexus-user');
    const savedToken = localStorage.getItem('energynexus-token');
    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser) as User;
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch {
        localStorage.removeItem('energynexus-user');
        localStorage.removeItem('energynexus-token');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const resp: AuthResponse = await authService.login({
        identifier: credentials.identifier,
        password: credentials.password,
      });
      const user: User = {
        id: resp.user.id,
        name: resp.user.fullName,
        email: resp.user.email,
        phone: resp.user.phone,
        pincode: resp.user.pincode,
        profilePicture: '',
        consumerId: undefined,
        isProsumer: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      localStorage.setItem('energynexus-user', JSON.stringify(user));
      localStorage.setItem('energynexus-token', resp.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore logout errors
    }
    localStorage.removeItem('energynexus-user');
    localStorage.removeItem('energynexus-token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('energynexus-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};