// client/src/api/types.ts

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

export interface Account {
  id: string;
  user: User;
  balance: string;
  account_number: string;
  account_type: string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface ApiError {
  error?: string;
  message?: string;
  detail?: string;
  [key: string]: any;
}

export interface DepositRequest {
  amount: number;
}

export interface WithdrawRequest {
  amount: number;
}

export interface UpdateBalanceRequest {
  balance: number;
}

export interface TransactionResponse {
  message: string;
  account: Account;
}