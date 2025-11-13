import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  onSellClick: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onSellClick }) => {
  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button
          onClick={onSellClick}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Sell Surplus Energy</span>
        </button>
        <Link
          to="/app/marketplace"
          className="w-full btn-secondary flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>View Marketplace</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuickActions;
