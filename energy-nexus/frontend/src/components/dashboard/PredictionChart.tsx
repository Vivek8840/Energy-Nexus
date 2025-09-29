import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PredictionChart: React.FC = () => {
  const data = useMemo(() =>
    days.map((d, i) => ({ day: d, value: 5 + Math.sin(i / 1.5) * 2 + Math.random() })),
  []);

  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">7-Day Solar Forecast</p>
          <p className="text-lg font-semibold text-gray-900">Predicted Generation</p>
        </div>
      </div>
      <div className="h-40 grid grid-cols-7 gap-3 items-end">
        {data.map((d, idx) => (
          <div key={d.day} className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.value / max) * 100}%` }}
              transition={{ delay: idx * 0.05, type: 'spring', stiffness: 160, damping: 18 }}
              className="w-8 bg-gradient-to-t from-green-400 to-blue-500 rounded-md"
            />
            <span className="mt-2 text-xs text-gray-500">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionChart;


