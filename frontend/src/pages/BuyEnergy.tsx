import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  CreditCard,
  Banknote,
  Wallet,
  CheckCircle,
  ArrowLeft,
  Leaf,
  Zap,
  IndianRupee,
  Calculator,
  Info,
  Shield,
  Clock,
  Star,
  TrendingDown,
  Users,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnergy } from '@/contexts/EnergyContext';
import { Link, useNavigate } from 'react-router-dom';

const BuyEnergy: React.FC = () => {
  const { state: authState } = useAuth();
  const { energyData, isLoading } = useEnergy();
  const navigate = useNavigate();

  const [energyAmount, setEnergyAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'wallet' | 'card' | 'upi' | 'netbanking'>('wallet');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock data - replace with actual API data
  const currentPrice = energyData?.currentPrice ?? 4.25;
  const availableProducers = [
    { id: '1', name: 'Rajesh Solar Farm', price: 4.25, rating: 4.8, distance: '2.3 km', capacity: '50 kW' },
    { id: '2', name: 'Green Energy Co-op', price: 3.95, rating: 4.9, distance: '3.1 km', capacity: '75 kW' },
    { id: '3', name: 'SunPower Solutions', price: 4.15, rating: 4.7, distance: '1.8 km', capacity: '100 kW' },
  ];

  const [selectedProducer, setSelectedProducer] = useState(availableProducers[0]);

  const calculateTotal = () => {
    const amount = parseFloat(energyAmount) || 0;
    const price = selectedProducer.price;
    const subtotal = amount * price;
    const platformFee = subtotal * 0.02; // 2% platform fee
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + platformFee + tax;
    return { subtotal, platformFee, tax, total };
  };

  const { subtotal, platformFee, tax, total } = calculateTotal();

  const handlePurchase = async () => {
    if (!energyAmount || parseFloat(energyAmount) <= 0) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would integrate with actual payment processing
      console.log('Processing purchase:', {
        amount: energyAmount,
        producer: selectedProducer,
        paymentMethod: selectedPaymentMethod,
        total: total
      });

      setOrderComplete(true);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: 'wallet',
      name: 'Wallet Balance',
      icon: Wallet,
      description: 'Pay using your Energy Nexus wallet',
      available: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay accepted',
      available: true
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Banknote,
      description: 'Pay using UPI apps like GPay, PhonePe',
      available: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Shield,
      description: 'Direct bank transfer',
      available: true
    }
  ];

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 lg:pb-6">
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
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Purchase Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
              You have successfully purchased {energyAmount} kWh of green energy from {selectedProducer.name}
            </p>

            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto mb-8 shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Energy Amount</span>
                  <span className="font-semibold">{energyAmount} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Producer</span>
                  <span className="font-semibold">{selectedProducer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CO₂ Offset</span>
                  <span className="font-semibold text-green-600">{(parseFloat(energyAmount) * 0.5).toFixed(1)} kg</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total Paid</span>
                  <span className="font-bold text-green-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-x-4">
              <Link
                to="/app/dashboard"
                className="btn-primary px-8 py-3"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/app/sell-energy"
                className="px-8 py-3 border border-orange-300 rounded-lg text-orange-700 hover:bg-orange-50 transition-colors"
              >
                Sell Energy
              </Link>
              <Link
                to="/app/marketplace"
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View Marketplace
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 lg:pb-6">
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
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  Buy Green Energy
                </h1>
                <p className="text-gray-600 mt-1">Purchase clean, renewable solar energy from local producers</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Energy Amount Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Select Energy Amount</h2>
                  <p className="text-gray-600">Choose how much green energy you want to purchase</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[5, 10, 25, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setEnergyAmount(amount.toString())}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      energyAmount === amount.toString()
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold">{amount} kWh</div>
                      <div className="text-sm text-gray-500">₹{(amount * selectedProducer.price).toFixed(0)}</div>
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

            {/* Producer Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Choose Energy Producer</h2>
                  <p className="text-gray-600">Select from verified local solar energy producers</p>
                </div>
              </div>

              <div className="space-y-4">
                {availableProducers.map((producer) => (
                  <motion.div
                    key={producer.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedProducer.id === producer.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedProducer(producer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{producer.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              {producer.rating}
                            </span>
                            <span>{producer.distance}</span>
                            <span>{producer.capacity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{producer.price}/kWh</div>
                        <div className="text-sm text-gray-500">Current price</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                  <p className="text-gray-600">Choose how you'd like to pay for your energy</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id as any)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${selectedPaymentMethod === method.id ? 'bg-purple-100' : 'bg-gray-100'}`}>
                          <IconComponent className={`w-5 h-5 ${selectedPaymentMethod === method.id ? 'text-purple-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-6 sticky top-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

              {energyAmount ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Energy Amount</span>
                    <span className="font-medium">{energyAmount} kWh</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit Price</span>
                    <span className="font-medium">₹{selectedProducer.price.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Platform Fee (2%)</span>
                    <span>₹{platformFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-bold text-green-600">₹{total.toFixed(2)}</span>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 mt-4">
                    <div className="flex items-center space-x-2 text-green-700">
                      <Leaf className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        CO₂ Offset: {(parseFloat(energyAmount) * 0.5).toFixed(1)} kg
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handlePurchase}
                    disabled={!energyAmount || isProcessing}
                    className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Complete Purchase</span>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Enter energy amount to see pricing</p>
                </div>
              )}
            </motion.div>

            {/* Benefits Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Buy Green Energy?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Leaf className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Environmental Impact</p>
                    <p className="text-sm text-gray-600">Reduce carbon footprint by up to 80%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingDown className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Cost Effective</p>
                    <p className="text-sm text-gray-600">Often cheaper than grid electricity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Blockchain Verified</p>
                    <p className="text-sm text-gray-600">Transparent and traceable transactions</p>
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

export default BuyEnergy;
