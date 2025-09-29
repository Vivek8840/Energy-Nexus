import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet as WalletIcon,
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Landmark, // Changed from Bank
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Edit,
  Shield,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Download,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BankAccount,
  UPIAccount,
  WalletTransaction,
} from '@/types';

const Wallet: React.FC = () => {
  const { state: authState } = useAuth();
  const { t } = useLanguage();

  const [balance, setBalance] = useState(2456.78);
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [accountType, setAccountType] = useState<'bank' | 'upi'>('bank');

  // Wallet transactions
  const [walletTransactions, setWalletTransactions] = useState<
    WalletTransaction[]
  >([]);

  // Bank accounts and UPI
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [upiDetails, setUpiDetails] = useState<UPIAccount[]>([]);

  // Withdrawal form
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    accountId: '',
    method: 'bank' as 'bank' | 'upi',
  });

  // Add account forms
  const [bankForm, setBankForm] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
  });

  const [upiForm, setUpiForm] = useState({
    upiId: '',
    providerName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize mock data
  useEffect(() => {
    const mockWalletTransactions: WalletTransaction[] = [
      {
        id: '1',
        type: 'credit',
        amount: 125.5,
        description: 'Energy sale - 12.5 kWh',
        date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: 'completed',
        transactionId: 'TXN001',
      },
      {
        id: '2',
        type: 'debit',
        amount: 500.0,
        description: 'Withdrawal to SBI ***4567',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        status: 'completed',
      },
      {
        id: '3',
        type: 'credit',
        amount: 89.25,
        description: 'Energy sale - 8.5 kWh',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        status: 'completed',
        transactionId: 'TXN002',
      },
    ];

    const mockBankAccounts: BankAccount[] = [
      {
        id: '1',
        accountNumber: '1234567890',
        accountHolderName: 'John Doe',
        bankName: 'State Bank of India',
        ifscCode: 'SBIN0001234',
        isPrimary: true,
      },
    ];

    const mockUpiDetails: UPIAccount[] = [
      {
        id: '1',
        upiId: 'john@paytm',
        name: 'Paytm',
        isPrimary: false,
      },
    ];

    setWalletTransactions(mockWalletTransactions);
    setBankAccounts(mockBankAccounts);
    setUpiDetails(mockUpiDetails);
  }, []);

  const handleWithdraw = async () => {
    // Validation
    const newErrors: Record<string, string> = {};

    if (!withdrawalForm.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(withdrawalForm.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(withdrawalForm.amount) > balance) {
      newErrors.amount = 'Insufficient balance';
    } else if (parseFloat(withdrawalForm.amount) < 100) {
      newErrors.amount = 'Minimum withdrawal amount is ₹100';
    }

    if (!withdrawalForm.accountId) {
      newErrors.accountId = 'Please select an account';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate withdrawal processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const withdrawalAmount = parseFloat(withdrawalForm.amount);
      setBalance((prev) => prev - withdrawalAmount);

      // Add withdrawal transaction
      const newTransaction: WalletTransaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount: withdrawalAmount,
        description: `Withdrawal to ${
          withdrawalForm.method === 'bank' ? 'Bank' : 'UPI'
        }`,
        date: new Date().toISOString(),
        status: 'pending',
      };

      setWalletTransactions((prev) => [newTransaction, ...prev]);
      setShowWithdrawModal(false);
      setWithdrawalForm({ amount: '', accountId: '', method: 'bank' });
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Withdrawal failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBankAccount = async () => {
    const newErrors: Record<string, string> = {};

    if (!bankForm.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (
      bankForm.accountNumber.length < 9 ||
      bankForm.accountNumber.length > 18
    ) {
      newErrors.accountNumber = 'Please enter a valid account number';
    }

    if (bankForm.accountNumber !== bankForm.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }

    if (!bankForm.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    }

    if (!bankForm.bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    if (!bankForm.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankForm.ifscCode)) {
      newErrors.ifscCode = 'Please enter a valid IFSC code';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP verification and account addition
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newAccount: BankAccount = {
        id: Date.now().toString(),
        accountNumber: bankForm.accountNumber,
        accountHolderName: bankForm.accountHolderName,
        bankName: bankForm.bankName,
        ifscCode: bankForm.ifscCode,
        isPrimary: bankAccounts.length === 0,
      };

      setBankAccounts((prev) => [...prev, newAccount]);
      setShowAddAccountModal(false);
      setBankForm({
        accountNumber: '',
        confirmAccountNumber: '',
        accountHolderName: '',
        bankName: '',
        ifscCode: '',
      });
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to add account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simulate small balance update
    setBalance((prev) => prev + Math.random() * 10);
    setIsLoading(false);
  };

  const formatAccountNumber = (accountNumber: string) => {
    return accountNumber.replace(/\d(?=\d{4})/g, '*');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Wallet
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your earnings and withdrawals
            </p>
          </div>
          <button
            onClick={refreshBalance}
            disabled={isLoading}
            className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-600 ${
                isLoading ? 'animate-spin' : ''
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <WalletIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Available Balance</p>
                    <h2 className="text-sm font-medium">EnergyNexus Wallet</h2>
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {showBalance ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  {showBalance
                    ? `₹${balance.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}`
                    : '₹•••••••'}
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12.5% this month</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Last earning 2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  disabled={balance < 100}
                  className="flex-1 bg-white text-primary-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Withdraw</span>
                </button>
                <button className="bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Statement</span>
                </button>
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {walletTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit'
                              ? 'bg-green-100'
                              : 'bg-red-100'
                          }`}
                        >
                          {transaction.type === 'credit' ? (
                            <ArrowDownRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>
                              {new Date(
                                transaction.date
                              ).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              {transaction.status === 'completed' ? (
                                <CheckCircle className="w-3 h-3 text-green-500" />
                              ) : transaction.status === 'pending' ? (
                                <Clock className="w-3 h-3 text-yellow-500" />
                              ) : (
                                <AlertCircle className="w-3 h-3 text-red-500" />
                              )}
                              <span className="capitalize">
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}₹
                          {transaction.amount.toFixed(2)}
                        </p>
                        {transaction.transactionId && (
                          <p className="text-sm text-gray-500">
                            ID: {transaction.transactionId}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 border-t border-gray-200">
                <button className="w-full text-center text-primary-600 hover:text-primary-700 font-medium">
                  View All Transactions
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Payment Methods
                </h3>
                <button
                  onClick={() => setShowAddAccountModal(true)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Bank Accounts */}
                {bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Landmark className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {account.bankName}
                        </p>
                        <p className="text-xs text-gray-500">
                          ***{account.accountNumber.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {account.isPrimary && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* UPI Accounts */}
                {upiDetails.map((upi) => (
                  <div
                    key={upi.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {upi.name}
                        </p>
                        <p className="text-xs text-gray-500">{upi.upiId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {upi.isPrimary && (
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Earned</span>
                  <span className="font-medium text-green-600">
                    ₹1,245.50
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Total Withdrawn
                  </span>
                  <span className="font-medium text-gray-900">₹800.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Daily</span>
                  <span className="font-medium text-gray-900">₹45.20</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Net Earnings
                  </span>
                  <span className="font-semibold text-primary-600">
                    ₹445.50
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">
                    Secure Transactions
                  </h4>
                  <p className="text-xs text-blue-700 mt-1">
                    All withdrawals require OTP verification and are processed
                    securely through our banking partners.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Withdraw Modal */}
        <AnimatePresence>
          {showWithdrawModal && (
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
                    <ArrowUpRight className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Withdraw Funds
                  </h3>
                  <p className="text-gray-600">
                    Available balance: ₹{balance.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={withdrawalForm.amount}
                      onChange={(e) => {
                        setWithdrawalForm((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }));
                        if (errors.amount)
                          setErrors((prev) => ({ ...prev, amount: '' }));
                      }}
                      placeholder="Enter amount"
                      className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.amount ? 'border-red-300' : 'border-gray-300'
                      }`}
                      min="100"
                      max={balance}
                    />
                    {errors.amount && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.amount}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum withdrawal: ₹100
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdraw to
                    </label>
                    <select
                      value={withdrawalForm.accountId}
                      onChange={(e) => {
                        setWithdrawalForm((prev) => ({
                          ...prev,
                          accountId: e.target.value,
                        }));
                        if (errors.accountId)
                          setErrors((prev) => ({ ...prev, accountId: '' }));
                      }}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.accountId
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select account</option>
                      {bankAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.bankName} - ***
                          {account.accountNumber.slice(-4)}
                        </option>
                      ))}
                      {upiDetails.map((upi) => (
                        <option key={upi.id} value={upi.id}>
                          {upi.name} - {upi.upiId}
                        </option>
                      ))}
                    </select>
                    {errors.accountId && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.accountId}
                      </p>
                    )}
                  </div>

                  {withdrawalForm.amount && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Processing Fee</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-gray-600">You'll receive</span>
                        <span className="font-semibold">
                          ₹{parseFloat(withdrawalForm.amount || '0').toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {errors.submit && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <p className="text-sm text-red-700">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={isLoading}
                    className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Withdraw</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Account Modal */}
        <AnimatePresence>
          {showAddAccountModal && (
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
                className="bg-white rounded-2xl p-6 max-w-md w-full max-h-screen overflow-y-auto"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Add Payment Method
                  </h3>
                  <p className="text-gray-600">
                    Add a bank account or UPI for withdrawals
                  </p>
                </div>

                {/* Account Type Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setAccountType('bank')}
                    className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      accountType === 'bank'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Landmark className="w-4 h-4 mr-2" />
                    Bank Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('upi')}
                    className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      accountType === 'upi'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    UPI
                  </button>
                </div>

                {/* Bank Account Form */}
                {accountType === 'bank' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={bankForm.accountNumber}
                        onChange={(e) => {
                          setBankForm((prev) => ({
                            ...prev,
                            accountNumber: e.target.value,
                          }));
                          if (errors.accountNumber)
                            setErrors((prev) => ({
                              ...prev,
                              accountNumber: '',
                            }));
                        }}
                        placeholder="Enter account number"
                        className={`input ${
                          errors.accountNumber ? 'input-error' : ''
                        }`}
                      />
                      {errors.accountNumber && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.accountNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Account Number
                      </label>
                      <input
                        type="text"
                        value={bankForm.confirmAccountNumber}
                        onChange={(e) => {
                          setBankForm((prev) => ({
                            ...prev,
                            confirmAccountNumber: e.target.value,
                          }));
                          if (errors.confirmAccountNumber)
                            setErrors((prev) => ({
                              ...prev,
                              confirmAccountNumber: '',
                            }));
                        }}
                        placeholder="Re-enter account number"
                        className={`input ${
                          errors.confirmAccountNumber ? 'input-error' : ''
                        }`}
                      />
                      {errors.confirmAccountNumber && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.confirmAccountNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={bankForm.accountHolderName}
                        onChange={(e) => {
                          setBankForm((prev) => ({
                            ...prev,
                            accountHolderName: e.target.value,
                          }));
                          if (errors.accountHolderName)
                            setErrors((prev) => ({
                              ...prev,
                              accountHolderName: '',
                            }));
                        }}
                        placeholder="As per bank records"
                        className={`input ${
                          errors.accountHolderName ? 'input-error' : ''
                        }`}
                      />
                      {errors.accountHolderName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.accountHolderName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={bankForm.bankName}
                        onChange={(e) => {
                          setBankForm((prev) => ({
                            ...prev,
                            bankName: e.target.value,
                          }));
                          if (errors.bankName)
                            setErrors((prev) => ({ ...prev, bankName: '' }));
                        }}
                        placeholder="e.g., State Bank of India"
                        className={`input ${
                          errors.bankName ? 'input-error' : ''
                        }`}
                      />
                      {errors.bankName && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.bankName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={bankForm.ifscCode}
                        onChange={(e) => {
                          setBankForm((prev) => ({
                            ...prev,
                            ifscCode: e.target.value.toUpperCase(),
                          }));
                          if (errors.ifscCode)
                            setErrors((prev) => ({ ...prev, ifscCode: '' }));
                        }}
                        placeholder="e.g., SBIN0001234"
                        className={`input ${
                          errors.ifscCode ? 'input-error' : ''
                        }`}
                        maxLength={11}
                      />
                      {errors.ifscCode && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.ifscCode}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* UPI Form */}
                {accountType === 'upi' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiForm.upiId}
                        onChange={(e) =>
                          setUpiForm((prev) => ({
                            ...prev,
                            upiId: e.target.value,
                          }))
                        }
                        placeholder="your@paytm or 9876543210@ybl"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provider
                      </label>
                      <select
                        value={upiForm.providerName}
                        onChange={(e) =>
                          setUpiForm((prev) => ({
                            ...prev,
                            providerName: e.target.value,
                          }))
                        }
                        className="input"
                      >
                        <option value="">Select UPI Provider</option>
                        <option value="Paytm">Paytm</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="BHIM">BHIM</option>
                        <option value="Amazon Pay">Amazon Pay</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddAccountModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      accountType === 'bank' ? handleAddBankAccount : () => {}
                    }
                    disabled={isLoading}
                    className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Add & Verify</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                  <p>OTP verification required for new accounts</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wallet;