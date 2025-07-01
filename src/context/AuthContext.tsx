import React, { createContext, useContext, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, registerUser, logout } from '@/store/slices/authSlice';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional, if you have user avatars
  // Tambahkan properti lain sesuai kebutuhan
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    await dispatch(loginUser({ email, password })).unwrap();
  };

  const register = async (name: string, email: string, password: string) => {
    await dispatch(registerUser({ name, email, password })).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout: handleLogout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
