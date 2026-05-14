import React, { useMemo, useState } from 'react';
import { AuthContext } from './auth.context';
import type { AuthContextValue, AuthUser, LoginInput, RegisterInput } from './auth.context';

const STORAGE_KEYS = {
  user: 'bp.auth.user',
  token: 'bp.auth.token',
  users: 'bp.auth.users',
} as const;

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const generateId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const buildUserFromEmail = (email: string, overrides?: Partial<AuthUser>): AuthUser => {
  const rawName = email.split('@')[0] || 'User';
  const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  return {
    id: generateId(),
    email,
    name,
    surname: '',
    roles: ['USER'],
    ...overrides,
  };
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() =>
    readJson<AuthUser | null>(STORAGE_KEYS.user, null),
  );
  const [isLoading] = useState(false);

  const login = async (data: LoginInput) => {
    const registeredUsers = readJson<AuthUser[]>(STORAGE_KEYS.users, []);
    const existing = registeredUsers.find((item) => item.email === data.email);
    const nextUser = existing ?? buildUserFromEmail(data.email);

    writeJson(STORAGE_KEYS.user, nextUser);
    localStorage.setItem(STORAGE_KEYS.token, `fake-token-${nextUser.id}`);
    setUser(nextUser);
  };

  const register = async (data: RegisterInput) => {
    const registeredUsers = readJson<AuthUser[]>(STORAGE_KEYS.users, []);
    const nextUser: AuthUser = buildUserFromEmail(data.email, {
      name: data.name,
      surname: data.surname,
    });

    const nextUsers = [
      ...registeredUsers.filter((item) => item.email !== nextUser.email),
      nextUser,
    ];

    writeJson(STORAGE_KEYS.users, nextUsers);
    writeJson(STORAGE_KEYS.user, nextUser);
    localStorage.setItem(STORAGE_KEYS.token, `fake-token-${nextUser.id}`);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
