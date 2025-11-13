 import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnergyData } from '@/types';

interface EnergyContextType {
  energyData: EnergyData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  sellSurplus: (amount: number) => Promise<void>;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const EnergyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [energyData, setEnergyData] = useState<EnergyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const fetchEnergyData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: EnergyData = {
        date: new Date().toISOString(),
        generated: 8.5,
        consumed: 6.2,
        sold: 2.3,
        earnings: 125.50,
      };
      
      setEnergyData(mockData);
    } catch (err) {
      setError('Failed to fetch energy data');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    fetchEnergyData();
  };

  const sellSurplus = async (amount: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to sell surplus energy
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update energy data after successful sale
      if (energyData) {
        const earnings = amount * 4.5; // Use a fixed price for now
        setEnergyData(prev => prev ? {
          ...prev,
          sold: prev.sold + amount,
          earnings: prev.earnings + earnings,
        } : null);
      }

      console.log(`Sold ${amount} kWh of surplus energy`);
    } catch (err) {
      setError('Failed to sell surplus energy');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data on mount
  useEffect(() => {
    fetchEnergyData();
    
    // Set up real-time updates (every 30 seconds in production)
    const interval = setInterval(fetchEnergyData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <EnergyContext.Provider value={{
      energyData,
      isLoading,
      error,
      refreshData,
      sellSurplus,
    }}>
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('useEnergy must be used within an EnergyProvider');
  }
  return context;
};