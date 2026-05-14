import { createContext } from 'react';

type AuthUser = {
  id: string;
  email: string;
  name: string;
  surname: string;
  roles: string[];
};

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  phoneNumber?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export type { AuthContextValue, AuthUser, LoginInput, RegisterInput };

