import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudSun, Droplets } from 'lucide-react';

type Weather = {
  temperatureC: number;
  cloudPercent: number;
  sunlightIndex: number; // 0-100
};

const randomWeather = (): Weather => ({
  temperatureC: 24 + Math.round((Math.random() - 0.5) * 6),
  cloudPercent: Math.max(0, Math.min(100, 40 + Math.round((Math.random() - 0.5) * 40))),
  sunlightIndex: Math.max(0, Math.min(100, 70 + Math.round((Math.random() - 0.5) * 40)))
});

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<Weather>(randomWeather());

  useEffect(() => {
    const id = setInterval(() => setWeather(randomWeather()), 5000);
    return () => clearInterval(id);
  }, []);

  const Icon = weather.cloudPercent > 60 ? Cloud : weather.cloudPercent > 30 ? CloudSun : Sun;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Real-Time Weather</p>
            <p className="text-lg font-semibold text-gray-900">Solar Conditions</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Sunlight Impact</p>
          <p className="text-lg font-bold text-yellow-600">{weather.sunlightIndex}%</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{weather.temperatureC}°C</p>
          <p className="text-xs text-gray-500">Temperature</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{weather.cloudPercent}%</p>
          <p className="text-xs text-gray-500">Cloud Cover</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{weather.sunlightIndex}</p>
          <p className="text-xs text-gray-500">Sun Index</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-yellow-400 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${weather.sunlightIndex}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-3 text-sm text-gray-600">
        <Droplets className="w-4 h-4 text-blue-500" />
        <span>Forecast refreshes every 5s (demo)</span>
      </div>
    </div>
  );
};

export default WeatherWidget;


