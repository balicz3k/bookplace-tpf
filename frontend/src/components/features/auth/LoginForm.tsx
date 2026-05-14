import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import type { LoginInput } from '../../../hooks/useAuth';

interface LoginFormProps {
  onSubmit: (data: LoginInput) => Promise<void>;
  onSwitchToRegister: () => void;
  isLoading: boolean;
}

type LoginErrors = Partial<Record<keyof LoginInput, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onSwitchToRegister, isLoading }) => {
  const [values, setValues] = useState<LoginInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});

  const validate = (data: LoginInput): LoginErrors => {
    const nextErrors: LoginErrors = {};
    if (!data.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!data.password.trim()) {
      nextErrors.password = 'Password is required';
    } else if (data.password.trim().length < 3) {
      nextErrors.password = 'Password must be at least 3 characters long';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof LoginInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    await onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 3, pb: 4 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        autoComplete="email"
        value={values.email}
        onChange={handleChange('email')}
        error={Boolean(errors.email)}
        helperText={errors.email || ' '}
        sx={{ mb: -1 }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        autoComplete="current-password"
        value={values.password}
        onChange={handleChange('password')}
        error={Boolean(errors.password)}
        helperText={errors.password || ' '}
        sx={{ mb: -1 }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{
          py: 1.5,
          mt: 2,
          mb: 3,
          bgcolor: 'primary.main',
          fontWeight: 'bold',
          fontSize: '1rem',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>

      <Typography variant="body2" textAlign="center">
        Don't have an account?{' '}
        <Button
          variant="text"
          onClick={onSwitchToRegister}
          sx={{
            textTransform: 'none',
            p: 0,
            minWidth: 'auto',
            color: 'primary.main',
            fontWeight: 'medium',
          }}
        >
          Sign up
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;

