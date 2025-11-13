import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import { EnergyProvider } from '@/contexts/EnergyContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/components/layout/Layout';

// Pages
import LandingPage from '@/pages/LandingPage';
import LanguageSelection from '@/pages/auth/LanguageSelection';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import Dashboard from '@/pages/Dashboard';
import BuyEnergy from '@/pages/BuyEnergy';
import SellEnergy from '@/pages/SellEnergy';
import Marketplace from '@/pages/Marketplace';
import Wallet from '@/pages/Wallet';
import Settings from '@/pages/Settings';
  
// Settings Sub-pages
import Profile from '@/pages/settings/Profile';
import SystemManagement from '@/pages/settings/SystemManagement';
import Notifications from '@/pages/settings/Notifications';
import Security from '@/pages/settings/Security';
import HelpSupport from '@/pages/settings/HelpSupport';
import Legal from '@/pages/settings/Legal';

import './styles/globals.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <UserProvider>
            <EnergyProvider>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="min-h-screen bg-gray-50 dark:bg-dark-900 dark:text-gray-100">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/language" element={<LanguageSelection />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    
                    {/* Protected Routes */}
                    <Route path="/app" element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Dashboard />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="buy-energy" element={<BuyEnergy />} />
                      <Route path="sell-energy" element={<SellEnergy />} />
                      <Route path="marketplace" element={<Marketplace />} />
                      <Route path="wallet" element={<Wallet />} />
                      <Route path="settings" element={<Settings />} />
                      
                      {/* Settings Sub-routes */}
                      <Route path="settings/profile" element={<Profile />} />
                      <Route path="settings/system" element={<SystemManagement />} />
                      <Route path="settings/notifications" element={<Notifications />} />
                      <Route path="settings/security" element={<Security />} />
                      <Route path="settings/help" element={<HelpSupport />} />
                      <Route path="settings/legal" element={<Legal />} />
                      <Route path="ai-price-oracle" element={<AIPriceOracle />} />
                      <Route path="blockchain-transparency-hub" element={<BlockchainTransparencyHub />} />
                      <Route path="energy-forecast" element={<EnergyForecast />} />
                      <Route path="energy-dashboard" element={<EnergyDashboard />} />
                    </Route>

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </Router>
            </EnergyProvider>
          </UserProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

import AIPriceOracle from '@/pages/AIPriceOracle';
import BlockchainTransparencyHub from '@/pages/BlockchainTransparencyHub';
import EnergyForecast from '@/pages/EnergyForecast';
import EnergyDashboard from '@/pages/EnergyDashboard';

export default App;
