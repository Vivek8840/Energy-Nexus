import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  DollarSign,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Transaction } from '@/types';

const Marketplace: React.FC = () => {
  const { state: authState } = useAuth();
  const { t } = useLanguage();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sell' | 'buy'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Mock transaction data
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'sell',
        amount: 12.5,
        pricePerUnit: 4.75,
        totalValue: 59.38,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        status: 'completed',
        blockchainHash: '0x1234567890abcdef',
        buyerId: 'buyer1',
        sellerId: authState.user?.id || 'user1'
      },
      {
        id: '2',
        type: 'buy',
        amount: 8.0,
        pricePerUnit: 4.50,
        totalValue: 36.00,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'completed',
        blockchainHash: '0xabcdef1234567890',
        buyerId: authState.user?.id || 'user1',
        sellerId: 'seller1'
      },
      {
        id: '3',
        type: 'sell',
        amount: 15.2,
        pricePerUnit: 4.85,
        totalValue: 73.72,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'completed',
        blockchainHash: '0x567890abcdef1234',
        buyerId: 'buyer2',
        sellerId: authState.user?.id || 'user1'
      },
      {
        id: '4',
        type: 'sell',
        amount: 6.8,
        pricePerUnit: 4.60,
        totalValue: 31.28,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        status: 'pending',
        buyerId: 'buyer3',
        sellerId: authState.user?.id || 'user1'
      },
      {
        id: '5',
        type: 'buy',
        amount: 20.0,
        pricePerUnit: 4.40,
        totalValue: 88.00,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
        status: 'failed',
        buyerId: authState.user?.id || 'user1',
        sellerId: 'seller2'
      }
    ];

    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, [authState.user?.id]);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      if (dateFilter === 'week') {
        filterDate.setDate(now.getDate() - 7);
      } else if (dateFilter === 'month') {
        filterDate.setMonth(now.getMonth() - 1);
      } else if (dateFilter === 'year') {
        filterDate.setFullYear(now.getFullYear() - 1);
      }
      
      filtered = filtered.filter(t => t.timestamp >= filterDate);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.blockchainHash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm) ||
        t.totalValue.toString().includes(searchTerm)
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, filterType, dateFilter, searchTerm]);

  const refreshTransactions = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const showBlockchainDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowBlockchainModal(true);
  };

  // Calculate summary statistics
  const totalSold = transactions.filter(t => t.type === 'sell' && t.status === 'completed').reduce((sum, t) => sum + t.totalValue, 0);
  const totalBought = transactions.filter(t => t.type === 'buy' && t.status === 'completed').reduce((sum, t) => sum + t.totalValue, 0);
  const totalTransactions = transactions.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Marketplace</h1>
            <p className="text-gray-600 mt-1">View your transaction history and market activity</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/app/buy-energy"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Buy Energy
            </Link>
            <Link
              to="/app/sell-energy"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              Sell Energy
            </Link>
            <button
              onClick={refreshTransactions}
              disabled={isLoading}
              className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total Sold</p>
              <p className="text-2xl font-bold text-green-600">₹{totalSold.toFixed(2)}</p>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                <span>Energy sold</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total Bought</p>
              <p className="text-2xl font-bold text-blue-600">₹{totalBought.toFixed(2)}</p>
              <div className="flex items-center space-x-1 text-xs text-blue-600">
                <ArrowDownRight className="w-3 h-3" />
                <span>Energy bought</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-primary-600">{totalTransactions}</p>
              <div className="flex items-center space-x-1 text-xs text-primary-600">
                <CheckCircle className="w-3 h-3" />
                <span>Completed</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Net Balance</p>
              <p className={`text-2xl font-bold ${totalSold > totalBought ? 'text-green-600' : 'text-blue-600'}`}>
                ₹{(totalSold - totalBought).toFixed(2)}
              </p>
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <Users className="w-3 h-3" />
                <span>P2P Trading</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'sell' | 'buy')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Transactions</option>
              <option value="sell">Sales Only</option>
              <option value="buy">Purchases Only</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as 'all' | 'week' | 'month' | 'year')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your filters to see more results.'
                  : 'Your transactions will appear here once you start trading energy.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Transaction Type Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'sell' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {transaction.type === 'sell' ? (
                          <ArrowUpRight className={`w-6 h-6 ${
                            transaction.type === 'sell' ? 'text-green-600' : 'text-blue-600'
                          }`} />
                        ) : (
                          <ArrowDownRight className="w-6 h-6 text-blue-600" />
                        )}
                      </div>

                      {/* Transaction Details */}
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">
                            {transaction.type === 'sell' ? 'Energy Sold' : 'Energy Purchased'}
                          </h3>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="capitalize">{transaction.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{transaction.amount} kWh</span>
                          <span>•</span>
                          <span>₹{transaction.pricePerUnit.toFixed(2)}/kWh</span>
                          <span>•</span>
                          <span>{formatTimestamp(transaction.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Value and Actions */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${
                          transaction.type === 'sell' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {transaction.type === 'sell' ? '+' : '-'}₹{transaction.totalValue.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">ID: {transaction.id}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        {transaction.blockchainHash && (
                          <button
                            onClick={() => showBlockchainDetails(transaction)}
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="View on blockchain"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Blockchain Verification Modal */}
        <AnimatePresence>
          {showBlockchainModal && selectedTransaction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Verification</h3>
                  <p className="text-gray-600">Transaction recorded on blockchain</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Transaction ID</p>
                        <p className="font-medium break-all">{selectedTransaction.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Block Hash</p>
                        <p className="font-medium break-all text-xs">{selectedTransaction.blockchainHash}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium capitalize">{selectedTransaction.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedTransaction.status)}
                          <span className="font-medium capitalize">{selectedTransaction.status}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-medium">{selectedTransaction.amount} kWh</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Value</p>
                        <p className="font-medium">₹{selectedTransaction.totalValue.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Verified on Blockchain</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      This transaction is immutable and transparent
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowBlockchainModal(false)}
                  className="w-full btn-primary"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Marketplace;