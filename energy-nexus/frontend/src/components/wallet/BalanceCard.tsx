import React from 'react';
import { Eye, EyeOff, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface BalanceCardProps {
  balance: number;
  showBalance: boolean;
  onToggleBalance: () => void;
  onWithdraw: () => void;
  monthlyEarnings?: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  balance, 
  showBalance, 
  onToggleBalance, 
  onWithdraw,
  monthlyEarnings = 0
}) => {
  return (
    <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-medium text-green-100 mb-2">Available Balance</h2>
          <div className="flex items-center gap-3">
            {showBalance ? (
              <p className="text-4xl font-bold">₹{balance.toLocaleString()}</p>
            ) : (
              <p className="text-4xl font-bold">₹••••••</p>
            )}
            <button
              onClick={onToggleBalance}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-green-100 mb-2">This Month</p>
          <p className="text-2xl font-semibold">+₹{monthlyEarnings.toLocaleString()}</p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="lg"
        onClick={onWithdraw}
        className="w-full bg-white/20 border-white/30 hover:bg-white/30"
      >
        <ArrowUpRight className="w-5 h-5 mr-2" />
        Withdraw to Bank
      </Button>
    </Card>
  );
};

export default BalanceCard;