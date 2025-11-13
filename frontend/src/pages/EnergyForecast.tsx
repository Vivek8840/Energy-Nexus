import React from 'react';
import { EnergyForecast as EnergyForecastComponent } from '@/components/dashboard/EnergyForecast';

const EnergyForecast: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Energy Forecast
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Stay ahead with AI-powered weather intelligence and market predictions.
          </p>
        </div>

        <EnergyForecastComponent />
      </div>
    </div>
  );
};

export default EnergyForecast;
