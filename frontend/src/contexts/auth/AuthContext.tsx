import React, { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth.context';
import type { AuthContextValue, AuthUser, LoginInput, RegisterInput } from './auth.context';
import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { databaseClinet } from '../../database/client';

const defaultRole = 'USER';
const hostEmailDomain = 'host.com';

const getFallbackName = (email?: string | null) => {
  const raw = email?.split('@')[0] || 'User';
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const splitDisplayName = (displayName?: string | null) => {
  if (!displayName) {
    return { name: '', surname: '' };
  }
  const parts = displayName.trim().split(/\s+/);
  const name = parts[0] || '';
  const surname = parts.slice(1).join(' ');
  return { name, surname };
};

const getRoleFromEmail = (email: string): string | null => {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return domain === hostEmailDomain ? 'HOST' : null;
};

const normalizeRoles = (claims?: Record<string, unknown>, email?: string): string[] => {
  const rolesClaim = claims?.roles ?? claims?.role;
  if (Array.isArray(rolesClaim)) {
    return rolesClaim.map((role) => String(role));
  }
  if (typeof rolesClaim === 'string' && rolesClaim.trim()) {
    return [rolesClaim];
  }
  const emailRole = email ? getRoleFromEmail(email) : null;
  return [emailRole ?? defaultRole];
};

const mapAuthUser = (user: User, claims?: Record<string, unknown>): AuthUser => {
  const email = user.email || '';
  const { name: displayName, surname: displaySurname } = splitDisplayName(user.displayName);
  const fallbackName = getFallbackName(email);

  return {
    id: user.uid,
    email,
    name: displayName || fallbackName,
    surname: displaySurname,
    roles: normalizeRoles(claims, email),
  };
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(databaseClinet, async (user) => {
      if (!user) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const tokenResult = await getIdTokenResult(user);
        setUser(mapAuthUser(user, tokenResult.claims));
      } catch {
        setUser(mapAuthUser(user));
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (data: LoginInput) => {
    await signInWithEmailAndPassword(databaseClinet, data.email, data.password);
  };

  const register = async (data: RegisterInput) => {
    const credential = await createUserWithEmailAndPassword(databaseClinet, data.email, data.password);
    const displayName = `${data.name} ${data.surname}`.trim();
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }
  };

  const logout = () => {
    void signOut(databaseClinet);
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
