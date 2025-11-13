import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  Monitor,
  Sparkles,
  Battery,
  Wind,
  CloudSun,
  ChevronDown,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import SunMoonToggle from '@/components/ui/SunMoonToggle';
import { ImpactCounter } from '@/components/dashboard/ImpactCounter';
import { MarketplaceCard } from '@/components/dashboard/MarketplaceCard';

// Indian States and Union Territories data
const indianStates = [
  { name: 'Andhra Pradesh', value: 'andhra-pradesh', region: 'South India', flag: '🇮🇳' },
  { name: 'Arunachal Pradesh', value: 'arunachal-pradesh', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Assam', value: 'assam', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Bihar', value: 'bihar', region: 'East India', flag: '🇮🇳' },
  { name: 'Chhattisgarh', value: 'chhattisgarh', region: 'Central India', flag: '🇮🇳' },
  { name: 'Goa', value: 'goa', region: 'West India', flag: '🇮🇳' },
  { name: 'Gujarat', value: 'gujarat', region: 'West India', flag: '🇮🇳' },
  { name: 'Haryana', value: 'haryana', region: 'North India', flag: '🇮🇳' },
  { name: 'Himachal Pradesh', value: 'himachal-pradesh', region: 'North India', flag: '🇮🇳' },
  { name: 'Jharkhand', value: 'jharkhand', region: 'East India', flag: '🇮🇳' },
  { name: 'Karnataka', value: 'karnataka', region: 'South India', flag: '🇮🇳' },
  { name: 'Kerala', value: 'kerala', region: 'South India', flag: '🇮🇳' },
  { name: 'Madhya Pradesh', value: 'madhya-pradesh', region: 'Central India', flag: '🇮🇳' },
  { name: 'Maharashtra', value: 'maharashtra', region: 'West India', flag: '🇮🇳' },
  { name: 'Manipur', value: 'manipur', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Meghalaya', value: 'meghalaya', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Mizoram', value: 'mizoram', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Nagaland', value: 'nagaland', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Odisha', value: 'odisha', region: 'East India', flag: '🇮🇳' },
  { name: 'Punjab', value: 'punjab', region: 'North India', flag: '🇮🇳' },
  { name: 'Rajasthan', value: 'rajasthan', region: 'West India', flag: '🇮🇳' },
  { name: 'Sikkim', value: 'sikkim', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Tamil Nadu', value: 'tamil-nadu', region: 'South India', flag: '🇮🇳' },
  { name: 'Telangana', value: 'telangana', region: 'South India', flag: '🇮🇳' },
  { name: 'Tripura', value: 'tripura', region: 'Northeast India', flag: '🇮🇳' },
  { name: 'Uttar Pradesh', value: 'uttar-pradesh', region: 'North India', flag: '🇮🇳' },
  { name: 'Uttarakhand', value: 'uttarakhand', region: 'North India', flag: '🇮🇳' },
  { name: 'West Bengal', value: 'west-bengal', region: 'East India', flag: '🇮🇳' },
  // Union Territories
  { name: 'Andaman and Nicobar Islands', value: 'andaman-nicobar', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Chandigarh', value: 'chandigarh', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', value: 'dnh-dd', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Delhi', value: 'delhi', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Jammu and Kashmir', value: 'jammu-kashmir', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Ladakh', value: 'ladakh', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Lakshadweep', value: 'lakshadweep', region: 'Union Territory', flag: '🇮🇳' },
  { name: 'Puducherry', value: 'puducherry', region: 'Union Territory', flag: '🇮🇳' }
];

const LandingPage: React.FC = () => {
  const { t, currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const { theme, setTheme, actualTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'existing' | 'planning'>('existing');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const stateDropdownRef = useRef<HTMLDivElement>(null);
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
  const [showAllStates, setShowAllStates] = useState(false);

  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
        setIsStateDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20 dark:from-slate-900 dark:via-green-950/20 dark:to-blue-950/10">
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Animated Background Orbs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-green-400/30 to-emerald-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-500/15 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Solar Rays Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-20 left-1/2 w-px h-32 bg-gradient-to-b from-yellow-400/50 to-transparent"
            style={{
              transformOrigin: 'top',
              rotate: `${i * 45}deg`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
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

                {/* Custom Language Dropdown */}
                <div className="relative" ref={languageDropdownRef}>
                  <motion.button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-700/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-300 dark:hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm text-gray-700 dark:text-gray-200 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Globe className="w-4 h-4 text-primary-500 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium">
                      {availableLanguages?.find(lng => lng.code === currentLanguage)?.flag}{' '}
                      {availableLanguages?.find(lng => lng.code === currentLanguage)?.nativeName}
                    </span>
                    <motion.div
                      animate={{ rotate: isLanguageDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary-500 transition-colors duration-300" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isLanguageDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {availableLanguages?.map((lng, index) => (
                            <motion.button
                              key={lng.code}
                              onClick={() => {
                                changeLanguage(lng.code);
                                setIsLanguageDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 flex items-center space-x-3 group ${
                                currentLanguage === lng.code
                                  ? 'bg-primary-100/50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              whileHover={{ x: 4 }}
                            >
                              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                {lng.flag}
                              </span>
                              <div className="flex flex-col">
                                <span className="font-medium text-sm">{lng.nativeName}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{lng.name}</span>
                              </div>
                              {currentLanguage === lng.code && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-auto w-2 h-2 bg-primary-500 rounded-full"
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                        <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/50 border-t border-gray-200/50 dark:border-gray-600/50">
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            🌍 Choose your preferred language
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

      <motion.section
        className="relative overflow-hidden"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 -z-10 opacity-60">
          <motion.div
            className="absolute left-1/2 top-16 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-green-200/40 via-yellow-200/30 to-blue-200/40 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <motion.h1
                  className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Turn Your{' '}
                  <motion.span
                    className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 bg-clip-text text-transparent block"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Sunlight
                  </motion.span>
                  Into{' '}
                  <motion.span
                    className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1,
                    }}
                    style={{
                      backgroundSize: '200% 200%',
                    }}
                  >
                    Profit
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mt-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  India's eco-futuristic P2P solar marketplace. Generate, trade, and earn with beautiful insights and fair pricing.
                </motion.p>
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
      </motion.section>

      <section id="calculator" className="py-16 lg:py-24 bg-gradient-to-br from-white/90 via-blue-50/50 to-green-50/50 dark:from-gray-900/90 dark:via-blue-950/20 dark:to-green-950/20 backdrop-blur-xl">
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
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 lg:p-8 shadow-xl">
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        State
                      </label>
                      <div className="relative" ref={stateDropdownRef}>
                        <motion.button
                          onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-700/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 hover:border-primary-300 dark:hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm text-gray-700 dark:text-gray-200 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl group"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <span className="font-medium">
                            {calculatorData.state ? indianStates.find(s => s.value === calculatorData.state)?.name : 'Select State'}
                          </span>
                          <motion.div
                            animate={{ rotate: isStateDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary-500 transition-colors duration-300" />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {isStateDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-600/50 overflow-hidden z-50 max-h-64 overflow-y-auto"
                            >
                              <div className="py-2">
                                {indianStates.map((state, index) => (
                                  <motion.button
                                    key={state.value}
                                    onClick={() => {
                                      setCalculatorData(prev => ({ ...prev, state: state.value }));
                                      setIsStateDropdownOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 text-left hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 flex items-center space-x-3 group ${
                                      calculatorData.state === state.value
                                        ? 'bg-primary-100/50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.02 }}
                                    whileHover={{ x: 2 }}
                                  >
                                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                      {state.flag}
                                    </span>
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{state.name}</span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">{state.region}</span>
                                    </div>
                                    {calculatorData.state === state.value && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-auto w-2 h-2 bg-primary-500 rounded-full"
                                      />
                                    )}
                                  </motion.button>
                                ))}
                              </div>
                              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/50 border-t border-gray-200/50 dark:border-gray-600/50">
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                  🏛️ Choose your state for accurate calculations
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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

      <section id="marketplace" className="py-16 lg:py-24 bg-gradient-to-br from-white/90 via-blue-50/50 to-green-50/50 dark:from-gray-900/90 dark:via-blue-950/20 dark:to-green-950/20 backdrop-blur-xl anim-pop">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              State-wise Market Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Energy-Nexus performance across India's solar-rich states
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { state: 'Gujarat', flag: '🇮🇳', marketCapture: 25, energySold: 500000, prosumerProfit: 50000000, consumerProfit: 30000000, gradient: 'from-yellow-400 via-orange-500 to-red-500', icon: Sun },
              { state: 'Rajasthan', flag: '🇮🇳', marketCapture: 22, energySold: 450000, prosumerProfit: 45000000, consumerProfit: 28000000, gradient: 'from-orange-400 via-red-500 to-pink-500', icon: CloudSun },
              { state: 'Maharashtra', flag: '🇮🇳', marketCapture: 18, energySold: 380000, prosumerProfit: 38000000, consumerProfit: 25000000, gradient: 'from-blue-400 via-purple-500 to-indigo-500', icon: Wind },
              { state: 'Karnataka', flag: '🇮🇳', marketCapture: 16, energySold: 350000, prosumerProfit: 35000000, consumerProfit: 22000000, gradient: 'from-green-400 via-teal-500 to-cyan-500', icon: Battery },
              { state: 'Tamil Nadu', flag: '🇮🇳', marketCapture: 14, energySold: 320000, prosumerProfit: 32000000, consumerProfit: 20000000, gradient: 'from-emerald-400 via-green-500 to-lime-500', icon: Sun },
              { state: 'Uttar Pradesh', flag: '🇮🇳', marketCapture: 12, energySold: 280000, prosumerProfit: 28000000, consumerProfit: 18000000, gradient: 'from-violet-400 via-purple-500 to-fuchsia-500', icon: CloudSun },
              { state: 'Madhya Pradesh', flag: '🇮🇳', marketCapture: 10, energySold: 250000, prosumerProfit: 25000000, consumerProfit: 16000000, gradient: 'from-rose-400 via-pink-500 to-red-500', icon: Wind },
              { state: 'NCR (Delhi)', flag: '🇮🇳', marketCapture: 8, energySold: 200000, prosumerProfit: 20000000, consumerProfit: 12000000, gradient: 'from-slate-400 via-gray-500 to-zinc-500', icon: Battery }
            ].filter((_, index) => showAllStates || index < 4).map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.state}
                  className={`relative overflow-hidden rounded-2xl p-4 text-center anim-pop shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-gradient-to-br ${item.gradient} dark:from-gray-800 dark:to-gray-900`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Animated Background Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      backgroundSize: '50% 50%',
                    }}
                  />

                  {/* Floating Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      animate={{
                        x: [0, Math.random() * 20 - 10],
                        y: [0, Math.random() * 20 - 10],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                    />
                  ))}

                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-3">
                      <motion.span
                        className="text-2xl mr-2"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {item.flag}
                      </motion.span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 text-white/80 mr-2"
                      >
                        <IconComponent className="w-full h-full" />
                      </motion.div>
                      <h3 className="text-base font-bold text-white drop-shadow-lg">{item.state}</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                        <motion.div
                          className="text-2xl font-bold text-white mb-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                          >
                            {item.marketCapture}%
                          </motion.span>
                        </motion.div>
                        <div className="flex items-center justify-center space-x-1">
                          <BarChart3 className="w-3 h-3 text-white/80" />
                          <p className="text-xs text-white/90 font-medium">Market Capture</p>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                        <motion.div
                          className="text-2xl font-bold text-white mb-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            {(item.energySold / 1000).toFixed(0)}k
                          </motion.span>
                        </motion.div>
                        <div className="flex items-center justify-center space-x-1">
                          <Zap className="w-3 h-3 text-white/80" />
                          <p className="text-xs text-white/90 font-medium">Energy Sold (kWh)</p>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                        <motion.div
                          className="text-2xl font-bold text-white mb-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                          >
                            ₹{(item.prosumerProfit / 100000).toFixed(0)}L
                          </motion.span>
                        </motion.div>
                        <div className="flex items-center justify-center space-x-1">
                          <IndianRupee className="w-3 h-3 text-white/80" />
                          <p className="text-xs text-white/90 font-medium">Profit to Prosumers</p>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                        <motion.div
                          className="text-2xl font-bold text-white mb-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 + index * 0.1 }}
                          >
                            ₹{(item.consumerProfit / 100000).toFixed(0)}L
                          </motion.span>
                        </motion.div>
                        <div className="flex items-center justify-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-white/80" />
                          <p className="text-xs text-white/90 font-medium">Profit to Consumers</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(45deg, ${item.gradient.split(' ')[1]}20, ${item.gradient.split(' ')[3]}20)`,
                      filter: 'blur(20px)',
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <motion.button
              onClick={() => setShowAllStates(!showAllStates)}
              className="btn-primary relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ x: showAllStates ? '100%' : '-100%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center space-x-2">
                <span>{showAllStates ? 'Show Top States' : 'View All States'}</span>
                <motion.div
                  animate={{ rotate: showAllStates ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50/90 via-blue-50/30 to-green-50/30 dark:from-gray-800/90 dark:via-blue-900/20 dark:to-green-900/20 backdrop-blur-xl anim-pop">
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
                  className="text-center anim-pop bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 shadow-xl"
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

      <section id="features" className="py-16 lg:py-24 bg-gradient-to-br from-white/90 via-blue-50/30 to-green-50/30 dark:from-gray-800/90 dark:via-blue-900/20 dark:to-green-900/20 backdrop-blur-xl anim-pop">
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
                  className="text-center p-6 anim-pop card-hover bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl"
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50/90 via-blue-50/30 to-green-50/30 dark:from-gray-800/90 dark:via-blue-900/20 dark:to-green-900/20 backdrop-blur-xl">
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