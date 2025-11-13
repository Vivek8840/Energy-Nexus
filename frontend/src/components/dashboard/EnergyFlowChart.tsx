import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Props {
  generation: number; // kWh
  consumption: number; // kWh
}

const EnergyFlowChart: React.FC<Props> = ({ generation, consumption }) => {
  const surplus = Math.max(0, generation - consumption);
  const used = Math.min(generation, consumption);
  const loss = Math.max(0, consumption - generation);

  const total = Math.max(generation, consumption) || 1;

  const segments = useMemo(() => [
    { label: 'Used', value: used, color: 'bg-blue-500' },
    { label: 'Profit', value: surplus, color: 'bg-green-500' },
    { label: 'Shortfall', value: loss, color: 'bg-red-500' },
  ], [used, surplus, loss]);

  return (
    <motion.div
      className="card p-6 bg-gradient-to-r from-blue-50 to-green-50 shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 font-semibold tracking-wide">Energy Flow</p>
          <p className="text-lg font-extrabold text-gray-900">Generation vs Consumption</p>
        </div>
        <motion.div
          className="p-2 bg-white rounded-full shadow-md"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95, rotate: -10 }}
        >
          <Sparkles className="w-6 h-6 text-green-500" />
        </motion.div>
      </div>
      <div className="space-y-3">
        <div className="h-5 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div className="flex h-full">
            {segments.map((s) => (
              <motion.div
                key={s.label}
                className={`${s.color} h-full`}
                initial={{ width: 0 }}
                animate={{ width: `${(s.value / total) * 100}%` }}
                transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
          {segments.map(s => (
            <div key={s.label} className="flex items-center space-x-2">
              <span className={`inline-block w-4 h-4 rounded-sm ${s.color} shadow-md`} />
              <span>{s.label}:</span>
              <span className="font-semibold text-gray-900">{s.value.toFixed(1)} kWh</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EnergyFlowChart;


