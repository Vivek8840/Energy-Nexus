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
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnergy } from '@/contexts/EnergyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { locationService, LocationData } from '@/services/locationService';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import PredictionChart from '@/components/dashboard/PredictionChart';
import EnergyFlowChart from '@/components/dashboard/EnergyFlowChart';
import { EnergyDashboard } from '@/components/dashboard/EnergyDashboard';
import { EnergyChart } from '@/components/dashboard/EnergyChart';
import { EnergyForecast } from '@/components/dashboard/EnergyForecast';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';
import { UrjaAdvisor } from '@/components/dashboard/UrjaAdvisor';
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
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

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

  // Fetch location data on component mount
  useEffect(() => {
    if (authState.user?.pincode) {
      const location = locationService.getLocationByPincode(authState.user.pincode);
      setLocationData(location);
    }
  }, [authState.user?.pincode]);

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
        </div>

        {/* Right Column - Flow Chart & Actions */}
        <div className="space-y-6">
          <EnergyFlowChart
            generation={realTimeData.generation}
            consumption={realTimeData.consumption}
          />

          {/* Quick Actions */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowSellModal(true)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Sell Surplus Energy</span>
              </button>
              <Link
                to="/app/marketplace"
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>View Marketplace</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  const ConsumerView = () => {
    // Location-based customization
    const locationBasedSellers = locationData ? [
      {
        name: `${locationData.city} Solar Co-op`,
        rating: 4.9,
        location: `${locationData.city}, ${locationData.state}`
      },
      {
        name: `${locationData.district} Green Energy`,
        rating: 4.7,
        location: `${locationData.district}, ${locationData.state}`
      },
      {
        name: "Regional Solar Farm",
        rating: 4.8,
        location: `${locationData.state} Region`
      }
    ] : [
      {
        name: "Rajesh Solar Farm",
        rating: 4.8,
        location: "Mumbai, Maharashtra"
      },
      {
        name: "Green Energy Co-op",
        rating: 4.9,
        location: "Delhi, NCR"
      },
      {
        name: "SunPower Solutions",
        rating: 4.7,
        location: "Bangalore, Karnataka"
      }
    ];

    return (
    <motion.div
      className="space-y-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-32 right-16 w-16 h-16 bg-blue-200 rounded-full opacity-15"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Green Energy Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="p-3 bg-green-100 rounded-xl shadow-md"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Leaf className="w-6 h-6 text-green-600" />
            </motion.div>
            <motion.span
              className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              Available
            </motion.span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Local Green Energy</p>
            <motion.p
              className="text-3xl font-extrabold text-green-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              ₹{realTimeData.price.toFixed(2)}/kWh
            </motion.p>
            <div className="flex items-center space-x-1 text-xs text-green-600 font-medium">
              <ArrowDownRight className="w-3 h-3" />
              <span>25% cleaner than grid</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="p-3 bg-blue-100 rounded-xl shadow-md"
              whileHover={{ rotate: -10, scale: 1.1 }}
            >
              <IndianRupee className="w-6 h-6 text-blue-600" />
            </motion.div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Grid Price</p>
            <motion.p
              className="text-3xl font-extrabold text-gray-600 dark:text-gray-300"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              ₹{realTimeData.gridPrice.toFixed(2)}/kWh
            </motion.p>
            <div className="flex items-center space-x-1 text-xs text-red-600 font-medium">
              <ArrowUpRight className="w-3 h-3" />
              <span>Higher carbon footprint</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="p-3 bg-primary-100 rounded-xl shadow-md"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Leaf className="w-6 h-6 text-primary-600" />
            </motion.div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">CO2 Saved Today</p>
            <motion.p
              className="text-3xl font-extrabold text-primary-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              {realTimeData.carbonSaved.toFixed(1)} kg
            </motion.p>
            <div className="flex items-center space-x-1 text-xs text-primary-600 font-medium">
              <Leaf className="w-3 h-3" />
              <span>Your green impact</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Buy Green Energy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Buy Green Energy</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Purchase clean solar energy from local producers
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Price Advantage</span>
                <span className="font-medium text-green-600">Save ₹0.55/kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Environmental Impact</span>
                <span className="font-medium text-green-600">100% Solar</span>
              </div>
            </div>

            <button
              onClick={() => setShowBuyModal(true)}
              className="w-full btn-primary"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Green Energy Credits
            </button>
          </div>
        </motion.div>

        {/* Solar Installation Prompt */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Go Solar & Earn</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Install solar panels and start selling energy
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">₹45,000</p>
                <p className="text-xs text-gray-600">Avg. Annual Savings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary-600">4.2 yrs</p>
                <p className="text-xs text-gray-600">Payback Period</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              Calculate My ROI
            </button>
          </div>
        </motion.div>
      </div>

      {/* Marketplace Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Available Energy Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationBasedSellers.map((seller, index) => (
            <MarketplaceCard
              key={index}
              seller={seller}
              energy={{
                amount: 25 + index * 5, // Vary amounts: 25, 30, 35
                pricePerKwh: 4.25 - index * 0.15, // Vary prices: 4.25, 4.10, 3.95
                totalPrice: (25 + index * 5) * (4.25 - index * 0.15)
              }}
              timeRemaining={`${2 + index}h ${30 - index * 15}m`}
              distance={`${2.5 + index * 0.7} km`}
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/app/marketplace" className="btn-primary">
            View All Listings
          </Link>
        </div>
      </motion.div>

      {/* Educational Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Why Choose Solar Energy?</h3>
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
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
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
    </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
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
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  View Energy Dashboard
                </Link>
              )}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

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