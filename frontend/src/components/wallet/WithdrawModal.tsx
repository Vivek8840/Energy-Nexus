import React, { useState } from 'react';
import { ArrowUpRight, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface BankAccount {
  id: string;
  accountNumber: string;
  bankName: string;
}

interface UPIAccount {
  id: string;
  upiId: string;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number, accountId: string, accountType: 'bank' | 'upi') => void;
  bankAccounts: BankAccount[];
  upiAccounts: UPIAccount[];
  currentBalance: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  onWithdraw,
  bankAccounts,
  upiAccounts,
  currentBalance
}) => {
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAmount = (value: string): boolean => {
    const numAmount = parseFloat(value);
    if (!value || isNaN(numAmount)) {
      setErrors(prev => ({ ...prev, amount: 'Please enter a valid amount' }));
      return false;
    }
    if (numAmount <= 0) {
      setErrors(prev => ({ ...prev, amount: 'Amount must be greater than 0' }));
      return false;
    }
    if (numAmount > currentBalance) {
      setErrors(prev => ({ ...prev, amount: 'Insufficient balance' }));
      return false;
    }
    if (numAmount < 100) {
      setErrors(prev => ({ ...prev, amount: 'Minimum withdrawal amount is ₹100' }));
      return false;
    }
    setErrors(prev => ({ ...prev, amount: '' }));
    return true;
  };

  const handleSubmit = () => {
    if (!validateAmount(amount)) return;
    if (!selectedAccount) {
      setErrors(prev => ({ ...prev, selectedAccount: 'Please select a payout method' }));
      return;
    }

    const [type, id] = selectedAccount.split('-');
    onWithdraw(parseFloat(amount), id, type as 'bank' | 'upi');
  };

  const handleClose = () => {
    setAmount('');
    setSelectedAccount('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <ArrowUpRight className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Withdraw Funds</h3>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Withdrawal Amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              validateAmount(e.target.value);
            }}
            error={errors.amount}
            icon={<span>₹</span>}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payout Method
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select account</option>
              {bankAccounts.map((account) => (
                <option key={account.id} value={`bank-${account.id}`}>
                  {account.bankName} - ***{account.accountNumber.slice(-4)}
                </option>
              ))}
              {upiAccounts.map((account) => (
                <option key={account.id} value={`upi-${account.id}`}>
                  {account.upiId}
                </option>
              ))}
            </select>
            {errors.selectedAccount && (
              <p className="text-red-500 text-sm mt-1">{errors.selectedAccount}</p>
            )}
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Processing Time:</p>
                <p>Bank transfers: 1-3 business days</p>
                <p>UPI transfers: Instant</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={!amount || !selectedAccount || !!errors.amount}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;