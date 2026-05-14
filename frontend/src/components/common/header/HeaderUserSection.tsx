import React, { useState } from 'react';
import { Box, Avatar } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import AuthModal from '../../features/auth/AuthModal';
import UserMenu from '../UserMenu';
import { UserButton, SignInButton, SignUpButton } from './Header.styles';

const HeaderUserSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);

  const handleSignInClick = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const userInitials = user
    ? `${user.name?.charAt(0) || ''}${user.surname?.charAt(0) || ''}`.trim() || 'U'
    : 'U';

  return (
    <>
      {isAuthenticated && user ? (
        <>
          <UserButton
            variant="outlined"
            onClick={handleUserMenuOpen}
            startIcon={<Avatar sx={{ width: 28, height: 28 }}>{userInitials}</Avatar>}
          >
            {user.name} {user.surname}
          </UserButton>
          <UserMenu
            user={user}
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
          />
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SignInButton variant="contained" onClick={handleSignInClick}>
            Sign In
          </SignInButton>
          <SignUpButton variant="outlined" onClick={handleSignUpClick}>
            Sign Up
          </SignUpButton>
        </Box>
      )}

      {!isAuthenticated && (
        <AuthModal
          open={authModalOpen}
          onClose={handleAuthModalClose}
          initialTab={authModalMode}
        />
      )}
    </>
  );
};

export default HeaderUserSection;
