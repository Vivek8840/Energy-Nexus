import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  Sun,
  Zap,
  TrendingUp,
  Battery,
  IndianRupee,
  Leaf,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  RefreshCw,
  Eye,
  ShoppingCart,
  Info,
  CheckCircle,
  Clock,
  Lightbulb,
  Sparkles,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnergy } from '@/contexts/EnergyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import PredictionChart from '@/components/dashboard/PredictionChart';
import EnergyFlowChart from '@/components/dashboard/EnergyFlowChart';
import { EnergyDashboard } from '@/components/dashboard/EnergyDashboard';
import { EnergyChart } from '@/components/dashboard/EnergyChart';
import { EnergyForecast } from '@/components/dashboard/EnergyForecast';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';
import { UrjaAdvisor } from '@/components/dashboard/UrjaAdvisor';
import { ImpactCounter } from '@/components/dashboard/ImpactCounter';
import { Notifications } from '@/components/dashboard/Notifications';
import QuickActions from '@/components/dashboard/QuickActions';
import LivePriceTracker from '@/components/dashboard/LivePriceTracker';
import CarbonOffsetTracker from '@/components/dashboard/CarbonOffsetTracker';
import EnergyEfficiencyTips from '@/components/dashboard/EnergyEfficiencyTips';
import CommunityImpactStatistics from '@/components/dashboard/CommunityImpactStatistics';
import QuickSettingsAccess from '@/components/dashboard/QuickSettingsAccess';
import EmergencyAlertsSection from '@/components/dashboard/EmergencyAlertsSection';
import AnimatedBackground from '@/components/dashboard/AnimatedBackground';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const { energyData, isLoading, refreshData, sellSurplus } = useEnergy();
  const { t } = useLanguage();

  const [showSellModal, setShowSellModal] = useState(false);
  const [sellAmount, setSellAmount] = useState('');
  const [isAutoSelling, setIsAutoSelling] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  const [showROIModal, setShowROIModal] = useState(false);
  const [roiInputs, setRoiInputs] = useState({
    systemSize: '3',
    electricityBill: '8000',
    electricityRate: '8'
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use energyData from context or fallback to default values
  const realTimeData = {
    generation: energyData?.generation ?? 0,
    consumption: energyData?.consumption ?? 0,
    surplus: energyData?.surplus ?? 0,
    price: energyData?.currentPrice ?? 0,
    todayEarnings: energyData?.todayEarnings ?? 0,
    carbonOffset: energyData?.todayCarbonOffset ?? 0,
    batteryLevel: 85, // keep static or get from energyData if available
    gridPrice: 3.20,  // static fallback
    carbonSaved: 2.8  // static fallback
  };

  // Removed setInterval for realTimeData updates to prevent flickering

  const isProsumer = authState.user?.isProsumer;

  const handleSellSurplus = async () => {
    try {
      await sellSurplus(parseFloat(sellAmount) || realTimeData.surplus);
      setShowSellModal(false);
      setSellAmount('');
    } catch (error) {
      console.error('Failed to sell surplus:', error);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing || isLoading) return;

    setIsRefreshing(true);
    try {
      await refreshData();
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      // Add a small delay to prevent rapid clicking
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const ProsumerView = () => (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top Row - Key Metrics */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
              Generation
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-600">{realTimeData.generation.toFixed(1)} kWh</p>
            <p className="text-sm text-gray-600">Today's Production</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Earnings
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-green-600">₹{realTimeData.todayEarnings.toFixed(0)}</p>
            <p className="text-sm text-gray-600">Today's Revenue</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="card p-6 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Battery className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
              Battery
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-purple-600">{realTimeData.batteryLevel}%</p>
            <p className="text-sm text-gray-600">Charge Level</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="card p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Leaf className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
              Carbon
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-orange-600">{realTimeData.carbonOffset.toFixed(1)} kg</p>
            <p className="text-sm text-gray-600">CO2 Offset</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Left Column - Charts */}
        <div className="xl:col-span-2 space-y-8">
          <EnergyDashboard />
          <EnergyChart
            generation={[0.5, 3.2, 6.1, 8.5, 9.2, 7.8, 4.1, 1.2]}
            consumption={[2.1, 2.8, 3.2, 4.1, 3.8, 4.5, 5.2, 6.1]}
          />

          {/* New Features Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/app/energy-forecast" className="block">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                    AI Powered
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Energy Forecast</h3>
                <p className="text-sm text-gray-600 mb-4">Predict future energy generation and consumption patterns</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>View Forecast</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>

            <Link to="/app/ai-price-oracle" className="block">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="card p-6 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                    Smart Pricing
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Price Oracle</h3>
                <p className="text-sm text-gray-600 mb-4">Get intelligent energy pricing recommendations</p>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  <span>View Oracle</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>

            <Link to="/app/blockchain-transparency-hub" className="block">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    Blockchain
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency Hub</h3>
                <p className="text-sm text-gray-600 mb-4">Track all energy transactions on blockchain</p>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <span>View Transactions</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="card p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                  Analytics
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-gray-600 mb-4">Comprehensive energy analytics and insights</p>
              <div className="flex items-center text-orange-600 text-sm font-medium">
                <span>Coming Soon</span>
                <Clock className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Flow Chart & Actions */}
        <div className="space-y-6">
          <EnergyFlowChart
            generation={realTimeData.generation}
            consumption={realTimeData.consumption}
          />

          <QuickActions onSellClick={() => setShowSellModal(true)} />
        </div>
      </motion.div>
    </motion.div>
  );

  const ConsumerView = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section with Key Stats */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="lg:col-span-2 card p-8 bg-gradient-to-br from-green-50 via-blue-50 to-green-100 border border-green-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Green Energy Available</h2>
              <p className="text-gray-600">Clean, renewable power from local solar producers</p>
            </div>
            <div className="p-4 bg-green-100 rounded-2xl">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Price</p>
              <p className="text-4xl font-bold text-green-600">₹{realTimeData.price.toFixed(2)}<span className="text-lg">/kWh</span></p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                25% cleaner than grid
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Your Impact Today</p>
              <p className="text-4xl font-bold text-blue-600">{realTimeData.carbonSaved.toFixed(1)}<span className="text-lg"> kg CO₂</span></p>
              <p className="text-xs text-blue-600 mt-1">Carbon offset</p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/app/buy-energy"
              className="btn-primary px-8 py-3 text-lg inline-flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Green Energy
            </Link>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"
        >
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
              <IndianRupee className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Grid Price Comparison</p>
            <p className="text-3xl font-bold text-gray-600">₹{realTimeData.gridPrice.toFixed(2)}<span className="text-lg">/kWh</span></p>
            <div className="mt-3 p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-red-600 flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                Higher carbon footprint
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Go Solar & Earn</h3>
              <p className="text-sm text-gray-600">Install panels and start selling energy</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <p className="text-xl font-bold text-green-600">₹45,000</p>
              <p className="text-xs text-gray-600">Annual Savings</p>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">4.2 yrs</p>
              <p className="text-xs text-gray-600">Payback</p>
            </div>
          </div>

          <button
            onClick={() => setShowROIModal(true)}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            Calculate My ROI
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Energy Marketplace</h3>
              <p className="text-sm text-gray-600">Browse available solar energy listings</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Rajesh Solar Farm</span>
              <span className="text-sm font-medium text-green-600">₹4.25/kWh</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm">Green Energy Co-op</span>
              <span className="text-sm font-medium text-green-600">₹3.95/kWh</span>
            </div>
          </div>

          <Link to="/app/marketplace" className="w-full btn-primary block text-center">
            View All Listings
          </Link>
        </motion.div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Why Choose Solar Energy?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Leaf,
              title: 'Environmental Impact',
              description: 'Reduce your carbon footprint by up to 80%'
            },
            {
              icon: IndianRupee,
              title: 'Cost Savings',
              description: 'Save 20-40% on your electricity bills'
            },
            {
              icon: TrendingUp,
              title: 'Energy Independence',
              description: 'Generate your own clean energy'
            }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Buy Energy Modal */}
      <AnimatePresence>
        {showBuyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Buy Green Energy</h3>
                <p className="text-gray-600">Purchase clean solar energy credits</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Energy Amount (kWh)
                  </label>
                  <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="input"
                    min="1"
                    step="1"
                  />
                </div>

                {buyAmount && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="font-medium">{buyAmount} kWh</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Price per kWh</span>
                      <span className="font-medium">₹{realTimeData.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">CO2 Offset</span>
                      <span className="font-medium text-green-600">{(parseFloat(buyAmount) * 0.5).toFixed(1)} kg</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total Cost</span>
                      <span className="font-bold text-green-600 text-lg">
                        ₹{(parseFloat(buyAmount) * realTimeData.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowBuyModal(false);
                    setBuyAmount('');
                  }}
                  disabled={!buyAmount || isLoading}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {showROIModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Solar ROI Calculator</h3>
                <p className="text-gray-600">Calculate your potential savings and payback period</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    System Size (kW)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.systemSize}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, systemSize: e.target.value }))}
                    placeholder="3"
                    className="input"
                    min="1"
                    step="0.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Electricity Bill (₹)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.electricityBill}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, electricityBill: e.target.value }))}
                    placeholder="8000"
                    className="input"
                    min="1000"
                    step="500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Electricity Rate (₹/kWh)
                  </label>
                  <input
                    type="number"
                    value={roiInputs.electricityRate}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, electricityRate: e.target.value }))}
                    placeholder="8"
                    className="input"
                    min="1"
                    step="0.5"
                  />
                </div>
              </div>

              {/* Calculations */}
              {roiInputs.systemSize && roiInputs.electricityBill && roiInputs.electricityRate && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Your Solar Investment Analysis</h4>

                  {(() => {
                    const systemSize = parseFloat(roiInputs.systemSize);
                    const monthlyBill = parseFloat(roiInputs.electricityBill);
                    const rate = parseFloat(roiInputs.electricityRate);

                    // Assumptions
                    const dailyGeneration = systemSize * 4.5; // kWh per day (average)
                    const monthlyGeneration = dailyGeneration * 30;
                    const monthlySavings = Math.min(monthlyGeneration * rate, monthlyBill);
                    const annualSavings = monthlySavings * 12;
                    const systemCost = systemSize * 50000; // ₹50,000 per kW
                    const paybackYears = systemCost / annualSavings;

                    return (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Estimated Monthly Generation</span>
                          <span className="font-medium text-green-600">{monthlyGeneration.toFixed(0)} kWh</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Monthly Savings</span>
                          <span className="font-medium text-green-600">₹{monthlySavings.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Annual Savings</span>
                          <span className="font-bold text-green-600">₹{annualSavings.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Estimated System Cost</span>
                          <span className="font-medium text-gray-900">₹{systemCost.toLocaleString()}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Payback Period</span>
                          <span className="font-bold text-blue-600">{paybackYears.toFixed(1)} years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">20-Year Savings</span>
                          <span className="font-bold text-green-600">₹{(annualSavings * 20).toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowROIModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Could add logic to save calculation or contact
                    setShowROIModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                >
                  Get Quote
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                * Calculations are estimates based on average solar irradiance. Actual results may vary.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 lg:pb-6 relative">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Welcome back, {authState.user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isProsumer
                  ? 'Monitor your solar generation and energy trading activities'
                  : 'Purchase clean solar energy from local producers'
                }
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isProsumer && (
                <Link
                  to="/app/energy-dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View Energy Dashboard
                </Link>
              )}
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/90 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Dynamic View */}
        {isProsumer ? <ProsumerView /> : <ConsumerView />}

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Last updated: Just now</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span>All prices include taxes</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;