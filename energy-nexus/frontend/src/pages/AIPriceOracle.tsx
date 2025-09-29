import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { TrendingUp, Zap, Brain, DollarSign, Clock, Activity, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AIPriceOracle: React.FC = () => {
  const { t } = useLanguage();
  const [currentPrice, setCurrentPrice] = useState(7.50);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('up');
  const [priceHistory, setPriceHistory] = useState<number[]>([7.20, 7.35, 7.50]);
  const [marketDemand, setMarketDemand] = useState<'High' | 'Medium' | 'Low'>('High');
  const [weatherForecast, setWeatherForecast] = useState<'Sunny' | 'Cloudy' | 'Rainy'>('Sunny');
  const [gridLoad, setGridLoad] = useState<'High' | 'Moderate' | 'Low'>('Moderate');

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.3;
        const newPrice = Math.max(5.0, Math.min(10.0, Number((prev + change).toFixed(2))));

        setPriceHistory(prev => [...prev.slice(-9), newPrice]);

        if (newPrice > prev) setTrend('up');
        else if (newPrice < prev) setTrend('down');
        else setTrend('stable');

        // Update market conditions occasionally
        if (Math.random() < 0.1) {
          const demands = ['High', 'Medium', 'Low'] as const;
          setMarketDemand(demands[Math.floor(Math.random() * demands.length)]);
        }
        if (Math.random() < 0.1) {
          const weathers = ['Sunny', 'Cloudy', 'Rainy'] as const;
          setWeatherForecast(weathers[Math.floor(Math.random() * weathers.length)]);
        }
        if (Math.random() < 0.1) {
          const loads = ['High', 'Moderate', 'Low'] as const;
          setGridLoad(loads[Math.floor(Math.random() * loads.length)]);
        }

        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingUp className="w-4 h-4 rotate-180" />;
      default: return <div className="w-4 h-4 bg-current rounded-full" />;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-600 border-green-600';
      case 'Medium': return 'text-yellow-600 border-yellow-600';
      case 'Low': return 'text-red-600 border-red-600';
      default: return 'text-gray-600 border-gray-600';
    }
  };

  const getWeatherColor = (weather: string) => {
    switch (weather) {
      case 'Sunny': return 'text-yellow-600 border-yellow-600';
      case 'Cloudy': return 'text-gray-600 border-gray-600';
      case 'Rainy': return 'text-blue-600 border-blue-600';
      default: return 'text-gray-600 border-gray-600';
    }
  };

  const getLoadColor = (load: string) => {
    switch (load) {
      case 'High': return 'text-red-600 border-red-600';
      case 'Moderate': return 'text-blue-600 border-blue-600';
      case 'Low': return 'text-green-600 border-green-600';
      default: return 'text-gray-600 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                AI Price Oracle
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time energy pricing powered by advanced AI algorithms
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Price Oracle Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-50 to-green-50 dark:from-dark-800 dark:to-dark-900 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full border border-primary-200 dark:border-primary-800 mb-6">
                  <Brain className="w-5 h-5 text-primary-600 mr-2" />
                  <span className="text-primary-700 dark:text-primary-300 font-medium text-sm">AI POWERED</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Current Energy Price
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Our advanced AI analyzes market conditions, weather patterns, and demand fluctuations to provide you with the optimal price for your energy.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Card className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border-primary-200 dark:border-primary-700">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      What's Your Energy Worth Right Now?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <div className="relative">
                      <div className="text-6xl font-bold text-primary-600 dark:text-primary-400 font-mono">
                        ₹{currentPrice.toFixed(2)}
                        <span className="text-xl text-gray-500">/kWh</span>
                      </div>
                      <div className={`flex items-center justify-center mt-3 ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span className="ml-2 text-lg font-medium capitalize">
                          {trend}
                        </span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2">
                      <Brain className="w-4 h-4 mr-2" />
                      Powered by EnergyNexus AI
                    </Badge>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">Market Demand</span>
                        </div>
                        <Badge variant="outline" className={getDemandColor(marketDemand)}>
                          {marketDemand}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">Weather Forecast</span>
                        </div>
                        <Badge variant="outline" className={getWeatherColor(weatherForecast)}>
                          {weatherForecast}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">Grid Load</span>
                        </div>
                        <Badge variant="outline" className={getLoadColor(gridLoad)}>
                          {gridLoad}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                      >
                        <DollarSign className="mr-2 w-5 h-5" />
                        Sell Energy Now
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Price updates every 3 seconds
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Price History & Analytics */}
          <div className="space-y-6">
            {/* Price History Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white dark:bg-dark-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    <span>Price History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Last 10 price updates
                  </div>
                  <div className="flex items-end space-x-1 h-32 justify-center bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
                    {priceHistory.slice(-10).map((price, index) => (
                      <motion.div
                        key={index}
                        className="bg-primary-500 rounded-sm w-4 hover:bg-primary-600 transition-colors relative group cursor-pointer"
                        style={{ height: `${Math.max(8, ((price - 5) / 5) * 100)}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ₹{price.toFixed(2)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>₹5.00</span>
                    <span>₹10.00</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-dark-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-primary-500" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">Optimal Selling Time</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Current conditions are favorable. Consider selling within the next 2 hours.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Market Prediction</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Price expected to rise by 8-12% in the next hour due to increased demand.
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Weather Impact</span>
                    </div>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Sunny weather forecast may increase solar generation and affect prices.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPriceOracle;
