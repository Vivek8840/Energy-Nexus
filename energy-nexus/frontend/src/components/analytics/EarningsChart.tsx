import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EarningsChartProps {
  data: Array<{
    date: string;
    earnings: number;
  }>;
  isLoading?: boolean;
}

const EarningsChart: React.FC<EarningsChartProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`₹${value}`, 'Earnings']} />
        <Legend />
        <Bar 
          dataKey="earnings" 
          fill="#10b981"
          name="Daily Earnings"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EarningsChart;