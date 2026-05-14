import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/auth.context';
import type { AuthContextValue, AuthUser, LoginInput, RegisterInput } from '../contexts/auth/auth.context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export type { AuthContextValue, AuthUser, LoginInput, RegisterInput };
