import React from 'react';
import { EnergyDashboard as EnergyDashboardComponent } from '@/components/dashboard/EnergyDashboard';

const EnergyDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Energy Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive view of your energy generation, consumption, and trading activities.
          </p>
        </div>

        <EnergyDashboardComponent />
      </div>
    </div>
  );
};

export default EnergyDashboard;
