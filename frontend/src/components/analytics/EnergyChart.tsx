import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnergyChartProps {
  data: Array<{
    date: string;
    generated: number;
    consumed: number;
    sold: number;
  }>;
  isLoading?: boolean;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="generated" 
          stroke="#22c55e" 
          strokeWidth={2}
          name="Generated"
        />
        <Line 
          type="monotone" 
          dataKey="consumed" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Consumed"
        />
        <Line 
          type="monotone" 
          dataKey="sold" 
          stroke="#f59e0b" 
          strokeWidth={2}
          name="Sold"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnergyChart;
