export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  transactionId?: string;
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountHolderName: string;
  bankName: string;
  ifscCode: string;
  isPrimary: boolean;
}

export interface UPIAccount {
  id: string;
  upiId: string;
  name: string;
  isPrimary: boolean;
}

export interface WalletBalance {
  available: number;
  pending: number;
  total: number;
}