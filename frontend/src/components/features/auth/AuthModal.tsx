import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Tabs, Tab, Alert } from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { useAuth, type LoginInput, type RegisterInput } from '../../../hooks/useAuth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`auth-tabpanel-${index}`}
    aria-labelledby={`auth-tab-${index}`}
    {...other}
  >
    {value === index && <Box>{children}</Box>}
  </div>
);

const getAuthErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Nieprawidlowy adres email.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Nieprawidlowy email lub haslo.';
      case 'auth/email-already-in-use':
        return 'Ten adres email jest juz zajety.';
      case 'auth/weak-password':
        return 'Haslo jest zbyt slabe.';
      case 'auth/too-many-requests':
        return 'Zbyt wiele prob. Sprobuj ponownie pozniej.';
      default:
        return fallback;
    }
  }
  return error instanceof Error ? error.message : fallback;
};

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, initialTab = 'login' }) => {
  const [tabValue, setTabValue] = useState(initialTab === 'login' ? 0 : 1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLoginSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError('');

    try {
      await login(data);
      onClose();
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err, 'Logowanie nie powiodlo sie'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError('');

    try {
      await register(data);
      onClose();
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err, 'Rejestracja nie powiodla sie'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  const handleEnter = () => {
    setTabValue(initialTab === 'login' ? 0 : 1);
    setError('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionProps={{ onEnter: handleEnter }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            maxWidth: 420,
            mx: 2,
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box>
          <Box sx={{ px: 3, pt: 3, pb: 1 }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
              <Tab
                label="Login"
                sx={{
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              />
              <Tab
                label="Register"
                sx={{
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              />
            </Tabs>
          </Box>

          {error && (
            <Box sx={{ px: 3, pt: 2 }}>
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            </Box>
          )}

          <TabPanel value={tabValue} index={0}>
            <LoginForm
              onSubmit={handleLoginSubmit}
              onSwitchToRegister={() => setTabValue(1)}
              isLoading={isLoading}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <RegisterForm
              onSubmit={handleRegisterSubmit}
              onSwitchToLogin={() => setTabValue(0)}
              isLoading={isLoading}
            />
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

