import { ApiResponse, WalletTransaction, WalletBalance, BankAccount, UPIAccount } from '../types';
import { APP_CONFIG } from '../utils/constants';

class WalletService {
  private baseUrl = `${APP_CONFIG.API_BASE_URL}/wallet`;

  async getBalance(): Promise<ApiResponse<WalletBalance>> {
    try {
      const response = await fetch(`${this.baseUrl}/balance`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: { available: 0, pending: 0, total: 0 },
        error: 'Failed to fetch balance'
      };
    }
  }

  async getTransactions(page = 1, limit = 10): Promise<ApiResponse<WalletTransaction[]>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await fetch(`${this.baseUrl}/transactions?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: [],
        error: 'Failed to fetch transactions'
      };
    }
  }

  async getBankAccounts(): Promise<ApiResponse<BankAccount[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/bank-accounts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: [],
        error: 'Failed to fetch bank accounts'
      };
    }
  }

  async addBankAccount(accountData: Omit<BankAccount, 'id' | 'isPrimary'>): Promise<ApiResponse<BankAccount>> {
    try {
      const response = await fetch(`${this.baseUrl}/bank-accounts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as BankAccount,
        error: 'Failed to add bank account'
      };
    }
  }

  async getUPIAccounts(): Promise<ApiResponse<UPIAccount[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/upi-accounts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: [],
        error: 'Failed to fetch UPI accounts'
      };
    }
  }

  async addUPIAccount(accountData: Omit<UPIAccount, 'id' | 'isPrimary'>): Promise<ApiResponse<UPIAccount>> {
    try {
      const response = await fetch(`${this.baseUrl}/upi-accounts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as UPIAccount,
        error: 'Failed to add UPI account'
      };
    }
  }

  async withdraw(amount: number, accountId: string, accountType: 'bank' | 'upi', otp: string): Promise<ApiResponse<WalletTransaction>> {
    try {
      const response = await fetch(`${this.baseUrl}/withdraw`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, accountId, accountType, otp })
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as WalletTransaction,
        error: 'Failed to process withdrawal'
      };
    }
  }

  async sendOTP(phoneNumber: string): Promise<ApiResponse<{ otpSent: boolean }>> {
    try {
      const response = await fetch(`${this.baseUrl}/send-otp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: { otpSent: false },
        error: 'Failed to send OTP'
      };
    }
  }
}

export default new WalletService();