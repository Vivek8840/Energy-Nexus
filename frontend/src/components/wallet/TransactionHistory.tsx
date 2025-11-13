import React from 'react';
import { ArrowDownLeft, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  transactionId?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, onViewAll }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
        {onViewAll && (
          <Button variant="secondary" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {transactions.slice(0, 8).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'credit' ? 
                  <ArrowDownLeft className="w-5 h-5 text-green-600" /> :
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                }
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
              </p>
              <div className="flex items-center gap-1">
                {transaction.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {transaction.status === 'pending' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                {transaction.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
                <span className={`text-xs font-medium capitalize ${
                  transaction.status === 'completed' ? 'text-green-600' :
                  transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionHistory;