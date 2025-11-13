import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AddBankAccountProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (accountData: {
    accountNumber: string;
    accountHolderName: string;
    bankName: string;
    ifscCode: string;
  }) => void;
  isLoading?: boolean;
}

const AddBankAccount: React.FC<AddBankAccountProps> = ({
  isOpen,
  onClose,
  onAdd,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (formData.accountNumber.length < 9) {
      newErrors.accountNumber = 'Invalid account number';
    }
    
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }
    
    if (!formData.accountHolderName) {
      newErrors.accountHolderName = 'Account holder name is required';
    }
    
    if (!formData.bankName) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const { confirmAccountNumber, ...accountData } = formData;
    onAdd(accountData);
  };

  const handleClose = () => {
    setFormData({
      accountNumber: '',
      confirmAccountNumber: '',
      accountHolderName: '',
      bankName: '',
      ifscCode: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Add Bank Account</h3>
        </div>
        
        <div className="space-y-4">
          <Input
            label="Account Number"
            type="text"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
            error={errors.accountNumber}
          />
          
          <Input
            label="Confirm Account Number"
            type="text"
            placeholder="Re-enter account number"
            value={formData.confirmAccountNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmAccountNumber: e.target.value }))}
            error={errors.confirmAccountNumber}
          />
          
          <Input
            label="Account Holder Name"
            type="text"
            placeholder="Enter account holder name"
            value={formData.accountHolderName}
            onChange={(e) => setFormData(prev => ({ ...prev, accountHolderName: e.target.value }))}
            error={errors.accountHolderName}
          />
          
          <Input
            label="Bank Name"
            type="text"
            placeholder="Enter bank name"
            value={formData.bankName}
            onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
            error={errors.bankName}
          />
          
          <Input
            label="IFSC Code"
            type="text"
            placeholder="Enter IFSC code"
            value={formData.ifscCode}
            onChange={(e) => setFormData(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
            error={errors.ifscCode}
          />
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
            loading={isLoading}
            className="flex-1"
          >
            Add Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBankAccount;