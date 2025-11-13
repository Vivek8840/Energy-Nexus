import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Battery,
  IndianRupee,
  Calculator,
  Info,
  CheckCircle,
  ArrowLeft,
  Leaf,
  Zap,
  Clock,
  Star,
  Users,
  Award,
  DollarSign,
  BarChart3,
  Sun,
  Coins,
  Target,
  PieChart,
  Activity,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnergy } from '@/contexts/EnergyContext';
import { Link, useNavigate } from 'react-router-dom';

const SellEnergy: React.FC = () => {
  const { state: authState } = useAuth();
  const { energyData, isLoading } = useEnergy();
  const navigate = useNavigate();

  const [energyAmount, setEnergyAmount] = useState('');
  const [selectedBuyer, setSelectedBuyer] = useState<'market' | 'direct' | 'grid'>('market');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock data - replace with actual API data
  const currentPrice = energyData?.currentPrice ?? 4.25;
  const availableBuyers = [
    { id: 'market', name: 'Energy Marketplace', price: 4.25, type: 'P2P Trading', buyers: '50+ active', icon: Users, color: 'blue' },
    { id: 'direct', name: 'Direct Consumers', price: 4.50, type: 'Direct Sale', buyers: 'Local network', icon: Target, color: 'green' },
    { id: 'grid', name: 'Grid Export', price: 3.80, type: 'Feed-in Tariff', buyers: 'Utility company', icon: Shield, color: 'orange' },
  ];

  const [selectedOption, setSelectedOption] = useState(availableBuyers[0]);

  const calculateEarnings = () => {
    const amount = parseFloat(energyAmount) || 0;
    const price = selectedOption.price;
    const subtotal = amount * price;
    const platformFee = selectedOption.id === 'market' ? subtotal * 0.05 : 0; // 5% for marketplace
    const tax = subtotal * 0.05; // 5% service tax
    const netEarnings = subtotal - platformFee - tax;
    return { subtotal, platformFee, tax, netEarnings };
  };

  const { subtotal, platformFee, tax, netEarnings } = calculateEarnings();

  const handleSell = async () => {
    if (!energyAmount || parseFloat(energyAmount) <= 0) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would integrate with actual selling API
      console.log('Processing energy sale:', {
        amount: energyAmount,
        buyer: selectedOption,
        netEarnings: netEarnings
      });

      setOrderComplete(true);
    } catch (error) {
      console.error('Sale failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Coins className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Energy Sold Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">
              You have successfully sold {energyAmount} kWh of solar energy to {selectedOption.name}
            </p>

            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto mb-8 shadow-lg border border-orange-100">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Energy Sold</span>
                  <span className="font-semibold">{energyAmount} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Buyer</span>
                  <span className="font-semibold">{selectedOption.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbon Credits Earned</span>
                  <span className="font-semibold text-green-600">{(parseFloat(energyAmount) * 0.5).toFixed(1)} credits</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Net Earnings</span>
                  <span className="font-bold text-orange-600">₹{netEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-x-4">
              <Link
                to="/app/dashboard"
                className="btn-primary bg-orange-600 hover:bg-orange-700 px-8 py-3"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/app/buy-energy"
                className="px-8 py-3 border border-green-300 rounded-lg text-green-700 hover:bg-green-50 transition-colors"
              >
                Buy Energy
              </Link>
              <Link
                to="/app/wallet"
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Wallet
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 lg:pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/app/dashboard"
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Sell Your Solar Energy
                </h1>
                <p className="text-gray-600 mt-1">Turn your excess solar power into earnings and contribute to the green grid</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Energy Generation Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Your Solar Generation</h2>
                  <p className="text-gray-600">Monitor your excess energy available for sale</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/70 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600">Today's Generation</p>
                      <p className="text-2xl font-bold text-orange-600">24.5 kWh</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center space-x-3">
                    <Battery className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Available to Sell</p>
                      <p className="text-2xl font-bold text-green-600">18.2 kWh</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center space-x-3">
                    <Coins className="w-8 h-8 text-amber-500" />
                    <div>
                      <p className="text-sm text-gray-600">Monthly Earnings</p>
                      <p className="text-2xl font-bold text-amber-600">₹2,450</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Energy Amount Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Select Energy to Sell</h2>
                  <p className="text-gray-600">Choose how much excess energy you want to monetize</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[5, 10, 15, 20].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setEnergyAmount(amount.toString())}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      energyAmount === amount.toString()
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold">{amount} kWh</div>
                      <div className="text-sm text-gray-500">₹{(amount * selectedOption.price).toFixed(0)}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Custom Amount (kWh)
                </label>
                <input
                  type="number"
                  value={energyAmount}
                  onChange={(e) => setEnergyAmount(e.target.value)}
                  placeholder="Enter energy amount"
                  className="input"
                  min="1"
                  step="0.1"
                />
              </div>
            </motion.div>

            {/* Selling Channels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Choose Selling Channel</h2>
                  <p className="text-gray-600">Select the best platform to sell your solar energy</p>
                </div>
              </div>

              <div className="space-y-4">
                {availableBuyers.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.div
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedOption.id === option.id
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedOption(option)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br from-${option.color}-400 to-${option.color}-500 rounded-lg flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{option.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{option.type}</span>
                              <span>{option.buyers}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-600">₹{option.price}/kWh</div>
                          <div className="text-sm text-gray-500">Current rate</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Earnings Calculator Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 sticky top-6 bg-gradient-to-b from-orange-50 to-amber-50 border-orange-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-orange-500" />
                <span>Earnings Calculator</span>
              </h3>

              {energyAmount ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Amount</span>
                    <span className="font-medium">{energyAmount} kWh</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Selling Rate</span>
                    <span className="font-medium">₹{selectedOption.price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Earnings</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {platformFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Platform Fee (5%)</span>
                      <span>-₹{platformFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Tax (5%)</span>
                    <span>-₹{tax.toFixed(2)}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Net Earnings</span>
                    <span className="font-bold text-orange-600">₹{netEarnings.toFixed(2)}</span>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mt-4 border border-green-200">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Leaf className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Carbon Credits: {(parseFloat(energyAmount) * 0.5).toFixed(1)} credits
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSell}
                    disabled={!energyAmount || isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 text-lg rounded-lg disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Sale...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-5 h-5" />
                        <span>Sell Energy</span>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Enter energy amount to see earnings</p>
                </div>
              )}
            </motion.div>

            {/* Prosumer Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6 bg-gradient-to-b from-amber-50 to-yellow-50 border-amber-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Prosumer Benefits</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Extra Income Stream</p>
                    <p className="text-sm text-gray-600">Earn money from excess solar generation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <PieChart className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Grid Stabilization</p>
                    <p className="text-sm text-gray-600">Help balance supply and demand in your area</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Carbon Credits</p>
                    <p className="text-sm text-gray-600">Earn tradable carbon credits for clean energy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Feed-in Tariff</p>
                    <p className="text-sm text-gray-600">Guaranteed payments for grid export</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellEnergy;
