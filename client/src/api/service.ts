// client/src/api/service.ts
import apiClient from './config';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Account,
  DepositRequest,
  WithdrawRequest,
  UpdateBalanceRequest,
  TransactionResponse,
} from './types';

export class ApiService {
  // Authentication endpoints
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register/', data);
    return response.data;
  }

  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login/', data);
    return response.data;
  }

  static async logout(refreshToken: string): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/logout/', {
      refresh: refreshToken,
    });
    return response.data;
  }

  static async getUserProfile(): Promise<User> {
    const response = await apiClient.get('/auth/profile/');
    return response.data;
  }

  // Account endpoints
  static async getUserAccount(): Promise<Account> {
    const response = await apiClient.get('/account/');
    return response.data;
  }

  static async depositMoney(data: DepositRequest): Promise<TransactionResponse> {
    const response = await apiClient.post('/account/deposit/', data);
    return response.data;
  }

  static async withdrawMoney(data: WithdrawRequest): Promise<TransactionResponse> {
    const response = await apiClient.post('/account/withdraw/', data);
    return response.data;
  }

  static async updateBalance(data: UpdateBalanceRequest): Promise<TransactionResponse> {
    const response = await apiClient.patch('/account/balance/', data);
    return response.data;
  }

  static async getTransactionHistory(): Promise<any[]> {
    const response = await apiClient.get('/account/transactions/');
    return response.data.transactions;
  }

  // Health check
  static async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await apiClient.get('/health/');
    return response.data;
  }
}

// Auth helper functions
export const authHelpers = {
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  },

  getTokens: () => ({
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
  }),

  clearTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },
};