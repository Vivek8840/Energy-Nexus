import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import {
  Zap,
  Sun,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  Calculator,
  Leaf,
  IndianRupee,
  MapPin,
  Home,
  Play,
  Check,
  Moon,
  Monitor
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import SunMoonToggle from '@/components/ui/SunMoonToggle';
import { ImpactCounter } from '@/components/dashboard/ImpactCounter';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';

const LandingPage: React.FC = () => {
  const { t, currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const { theme, setTheme, actualTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'existing' | 'planning'>('existing');
  const [calculatorData, setCalculatorData] = useState({
    location: '',
    billAmount: '',
    systemSize: '',
    state: '',
    city: ''
  });
  const [results, setResults] = useState<any>(null);
  const [liveStats, setLiveStats] = useState({
    todayPrice: 4.75,
    kWhTraded: 1245,
    totalUsers: 5420
  });

  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        todayPrice: prev.todayPrice + (Math.random() - 0.5) * 0.1,
        kWhTraded: prev.kWhTraded + Math.floor(Math.random() * 10),
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const calculateResults = () => {
    if (activeTab === 'existing') {
      const annualEarnings = parseFloat(calculatorData.systemSize) * 1500 * 4.5;
      const annualSavings = parseFloat(calculatorData.billAmount) * 12 * 0.4;
      const carbonOffset = parseFloat(calculatorData.systemSize) * 1200;
      setResults({
        type: 'existing',
        annualEarnings: annualEarnings || 0,
        annualSavings: annualSavings || 0,
        carbonOffset: carbonOffset || 0
      });
    } else {
      const recommendedSize = Math.ceil(parseFloat(calculatorData.billAmount) * 12 / 1200);
      const installationCost = recommendedSize * 60000;
      const subsidyAmount = Math.min(installationCost * 0.4, 78000);
      const finalCost = installationCost - subsidyAmount;
      const annualSavingsEarnings = recommendedSize * 1500 * 4.5;
      const paybackYears = finalCost / annualSavingsEarnings;
      const lifetimeEarnings = annualSavingsEarnings * 25 - finalCost;
      setResults({
        type: 'planning',
        recommendedSize,
        installationCost,
        subsidyAmount,
        finalCost,
        annualSavingsEarnings,
        paybackYears,
        lifetimeEarnings
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(34,197,94,0.15),transparent),radial-gradient(900px_500px_at_110%_10%,rgba(59,130,246,0.12),transparent)]">
      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-blue-400/20 blur-3xl" />
      <nav className="bg-[var(--nav-bg)]/90 backdrop-blur-xl border-b border-[var(--border-color)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold gradient-text tracking-tight">{t('app.title')}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">How it Works</a>
              <a href="#calculator" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">Calculator</a>

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                <SunMoonToggle />

                {/* Language Dropdown */}
                <div className="relative">
                  <select
                    aria-label="Select language"
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                    value={currentLanguage}
                    onChange={(e) => changeLanguage(e.target.value)}
                  >
                    {availableLanguages?.map((lng) => (
                      <option key={lng.code} value={lng.code}>
                        {lng.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
              <Link to="/signup" className="btn-primary anim-glow">Get Started</Link>
            </div>
            <div className="md:hidden">
              <Link to="/signup" className="btn-primary anim-glow">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary-200/30 to-secondary-200/30 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
                  Turn Your Sunlight
                  <span className="gradient-text block">Into Profit</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mt-6 leading-relaxed">
                  India’s eco‑futuristic P2P solar marketplace. Generate, trade, and earn with beautiful insights and fair pricing.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 glow"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Calculate Your Potential</span>
                </button>
                <Link to="/signup" className="btn-outline flex items-center space-x-2 text-lg px-8 py-4">
                  <span>Sign Up Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center anim-pop">
                  <motion.div
                    className="text-2xl font-bold text-primary-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ₹{liveStats.todayPrice.toFixed(2)}
                  </motion.div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Today's Best Price</p>
                </div>
                <div className="text-center anim-pop">
                  <motion.div
                    className="text-2xl font-bold text-secondary-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    {liveStats.kWhTraded.toLocaleString()}
                  </motion.div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">kWh Traded Today</p>
                </div>
                <div className="text-center anim-pop">
                  <motion.div
                    className="text-2xl font-bold text-accent-600"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    {liveStats.totalUsers.toLocaleString()}
                  </motion.div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[520px] rounded-3xl overflow-hidden card-eco">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 lg:w-48 lg:h-48"
                    >
                      <Sun className="w-full h-full text-yellow-500" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-4 -right-4 w-16 h-16 lg:w-24 lg:h-24 bg-primary-500 rounded-full flex items-center justify-center glow"
                    >
                      <Zap className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 left-8 glass rounded-lg p-3 shadow-lg"
                >
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <p className="text-xs font-medium mt-1">+25% Savings</p>
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 right-8 glass rounded-lg p-3 shadow-lg"
                >
                  <Leaf className="w-6 h-6 text-green-600" />
                  <p className="text-xs font-medium mt-1">Carbon Neutral</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 lg:py-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Calculate Your Solar Potential
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover how much you can save and earn with solar energy
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
              <button
                onClick={() => setActiveTab('existing')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  activeTab === 'existing'
                    ? 'bg-white dark:bg-gray-900 text-primary-600 shadow-sm anim-pop'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Home className="w-5 h-5 inline-block mr-2" />
                For Homes with Solar
              </button>
              <button
                onClick={() => setActiveTab('planning')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  activeTab === 'planning'
                    ? 'bg-white dark:bg-gray-900 text-primary-600 shadow-sm anim-pop'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Calculator className="w-5 h-5 inline-block mr-2" />
                Planning Solar Installation
              </button>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-8 shadow-soft">
              {activeTab === 'existing' ? (
                <div className="space-y-6 anim-pop">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Your Location
                      </label>
                      <input
                        type="text"
                        placeholder="City, State"
                        value={calculatorData.location}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, location: e.target.value }))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <IndianRupee className="w-4 h-4 inline mr-1" />
                        Monthly Bill Amount
                      </label>
                      <input
                        type="number"
                        placeholder="₹ 3,000"
                        value={calculatorData.billAmount}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, billAmount: e.target.value }))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Sun className="w-4 h-4 inline mr-1" />
                        System Size (kW)
                      </label>
                      <input
                        type="number"
                        placeholder="5"
                        value={calculatorData.systemSize}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, systemSize: e.target.value }))}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 anim-pop">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                      <select
                        value={calculatorData.state}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, state: e.target.value }))}
                        className="input"
                      >
                        <option value="">Select State</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="gujarat">Gujarat</option>
                        <option value="rajasthan">Rajasthan</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamilnadu">Tamil Nadu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        placeholder="Enter city"
                        value={calculatorData.city}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, city: e.target.value }))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Electricity Bill</label>
                      <input
                        type="number"
                        placeholder="₹ 3,000"
                        value={calculatorData.billAmount}
                        onChange={(e) => setCalculatorData(prev => ({ ...prev, billAmount: e.target.value }))}
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6">
                <button
                  onClick={calculateResults}
                  disabled={!calculatorData.billAmount}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed anim-glow"
                >
                  <Calculator className="w-5 h-5 inline mr-2" />
                  Calculate My Potential
                </button>
              </div>
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl anim-pop"
                >
                  {results.type === 'existing' ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600">
                          ₹{results.annualEarnings.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Annual Earnings</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary-600">
                          ₹{results.annualSavings.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {results.carbonOffset.toLocaleString()} kg
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">CO2 Offset/Year</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Recommended System Size</h4>
                          <p className="text-2xl font-bold text-primary-600">{results.recommendedSize} kW</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Investment Payback</h4>
                          <p className="text-2xl font-bold text-secondary-600">
                            {Math.floor(results.paybackYears)} years {Math.floor((results.paybackYears % 1) * 12)} months
                          </p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900 dark:text-gray-100">₹{results.finalCost.toLocaleString()}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Final Cost (After Subsidy)</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">₹{results.annualSavingsEarnings.toLocaleString()}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Annual Savings + Earnings</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primary-600">₹{results.lifetimeEarnings.toLocaleString()}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">25-Year Profit</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="marketplace" className="py-16 lg:py-24 bg-white dark:bg-gray-900 anim-pop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Energy Marketplace
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Buy clean solar energy from local producers at competitive prices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketplaceCard
              seller={{
                name: "Rajesh Solar Farm",
                rating: 4.8,
                location: "Mumbai, Maharashtra"
              }}
              energy={{
                amount: 25,
                pricePerKwh: 4.25,
                totalPrice: 106.25
              }}
              timeRemaining="2h 30m"
              distance="2.5 km"
            />
            <MarketplaceCard
              seller={{
                name: "Green Energy Co-op",
                rating: 4.9,
                location: "Delhi, NCR"
              }}
              energy={{
                amount: 50,
                pricePerKwh: 3.95,
                totalPrice: 197.5
              }}
              timeRemaining="4h 15m"
              distance="5.2 km"
            />
            <MarketplaceCard
              seller={{
                name: "SunPower Solutions",
                rating: 4.7,
                location: "Bangalore, Karnataka"
              }}
              energy={{
                amount: 30,
                pricePerKwh: 4.10,
                totalPrice: 123
              }}
              timeRemaining="1h 45m"
              distance="3.8 km"
            />
          </div>
          <div className="text-center mt-8">
            <Link to="/marketplace" className="btn-primary">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800 anim-pop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How EnergyNexus Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Simple 3-step process to start trading solar energy and earning more from your investment
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[{step:1,title:'Connect Your System',description:'Link your solar system using your Consumer ID from electricity bill',icon:Zap,color:'primary'},{step:2,title:'Generate & Sell',description:'Monitor real-time generation and sell surplus energy at best market rates',icon:Sun,color:'secondary'},{step:3,title:'Earn More',description:'Get paid directly to your bank account, earn 20-40% more than grid sell-back',icon:TrendingUp,color:'accent'}].map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.step * 0.2 }}
                  className="text-center anim-pop"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 bg-${item.color}-100 rounded-full flex items-center justify-center relative anim-glow`}>
                    <IconComponent className={`w-10 h-10 text-${item.color}-600`} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="py-16 lg:py-24 bg-white anim-pop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EnergyNexus?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The most advanced solar energy trading platform in India
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[{icon:Shield,title:'Blockchain Secure',description:'Every transaction is recorded on blockchain for complete transparency and security'},{icon:TrendingUp,title:'20-40% Higher Returns',description:'Earn significantly more than traditional grid sell-back rates'},{icon:Users,title:'Peer-to-Peer Trading',description:'Direct energy trading with neighbors and local businesses'},{icon:BarChart3,title:'Real-time Analytics',description:'Track your energy generation, consumption, and earnings in real-time'},{icon:Leaf,title:'Carbon Impact',description:'Monitor and showcase your positive environmental impact'},{icon:Zap,title:'AI-Powered Pricing',description:'Smart algorithms ensure you get the best price for your energy'}].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 anim-pop card-hover"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center anim-glow">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 anim-pop">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Ready to Maximize Your Solar Investment?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of solar owners who are already earning more with EnergyNexus. 
              Start trading your excess energy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg anim-glow"
              >
                Sign Up Free
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors text-lg anim-pop">
                <Play className="w-5 h-5 inline mr-2" />
                Watch Demo
              </button>
            </div>
            <div className="flex items-center justify-center space-x-6 pt-8">
              <div className="flex items-center space-x-2 text-white/80 anim-float">
                <Check className="w-5 h-5" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80 anim-float">
                <Check className="w-5 h-5" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80 anim-float">
                <Check className="w-5 h-5" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Community Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See the real difference we're making together
            </p>
          </div>
          <ImpactCounter />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 anim-pop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center anim-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{t('app.title')}</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                India's first peer-to-peer solar energy trading platform. 
                Empowering solar owners to earn more from their investment.
              </p>
              <div className="flex space-x-4">
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 EnergyNexus. All rights reserved. Powering sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;