// client/src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User, Account } from '../api/types';
import { ApiService, authHelpers } from '../api/service';

interface AuthContextType {
  user: User | null;
  account: Account | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Define refreshUserData first before using it in useEffect
  const refreshUserData = useCallback(async () => {
    try {
      const [userResponse, accountResponse] = await Promise.all([
        ApiService.getUserProfile(),
        ApiService.getUserAccount(),
      ]);
      
      setUser(userResponse);
      setAccount(accountResponse);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      throw error;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await ApiService.login({ email, password });
      
      authHelpers.setTokens(response.tokens.access, response.tokens.refresh);
      setUser(response.user);
      
      // Get account data
      const accountData = await ApiService.getUserAccount();
      setAccount(accountData);
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirm: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await ApiService.register(data);
      
      authHelpers.setTokens(response.tokens.access, response.tokens.refresh);
      setUser(response.user);
      
      // Get account data
      const accountData = await ApiService.getUserAccount();
      setAccount(accountData);
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { refreshToken } = authHelpers.getTokens();
      if (refreshToken) {
        await ApiService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      authHelpers.clearTokens();
      setUser(null);
      setAccount(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authHelpers.isAuthenticated()) {
          await refreshUserData();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authHelpers.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [refreshUserData]);

  const value = useMemo(() => ({
    user,
    account,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUserData,
  }), [user, account, isAuthenticated, isLoading, login, register, logout, refreshUserData]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};