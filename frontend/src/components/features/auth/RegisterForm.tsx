import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import type { RegisterInput } from '../../../hooks/useAuth';

interface RegisterFormProps {
  onSubmit: (data: RegisterInput) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

type RegisterErrors = Partial<Record<keyof RegisterInput, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?\d[\d\s()-]{6,}$/;

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onSwitchToLogin, isLoading }) => {
  const [values, setValues] = useState<RegisterInput>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  const validate = (data: RegisterInput): RegisterErrors => {
    const nextErrors: RegisterErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = 'Imię jest wymagane';
    } else if (data.name.trim().length < 2) {
      nextErrors.name = 'Imię musi mieć co najmniej 2 znaki';
    }

    if (!data.surname.trim()) {
      nextErrors.surname = 'Nazwisko jest wymagane';
    } else if (data.surname.trim().length < 2) {
      nextErrors.surname = 'Nazwisko musi mieć co najmniej 2 znaki';
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Email jest wymagany';
    } else if (!emailRegex.test(data.email)) {
      nextErrors.email = 'Wprowadź poprawny adres email';
    }

    if (data.phoneNumber?.trim()) {
      if (!phoneRegex.test(data.phoneNumber.trim())) {
        nextErrors.phoneNumber = 'Wprowadź poprawny numer telefonu';
      }
    }

    if (!data.password.trim()) {
      nextErrors.password = 'Hasło jest wymagane';
    } else if (data.password.trim().length < 3) {
      nextErrors.password = 'Hasło musi mieć co najmniej 3 znaki';
    }

    if (!data.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Potwierdź swoje hasło';
    } else if (data.confirmPassword.trim() !== data.password.trim()) {
      nextErrors.confirmPassword = 'Hasła nie pasują do siebie';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof RegisterInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <Box sx={{ display: 'flex', gap: 2, mb: -1 }}>
        <TextField
          fullWidth
          label="Imię"
          autoComplete="given-name"
          value={values.name}
          onChange={handleChange('name')}
          error={Boolean(errors.name)}
          helperText={errors.name || ' '}
        />

        <TextField
          fullWidth
          label="Nazwisko"
          autoComplete="family-name"
          value={values.surname}
          onChange={handleChange('surname')}
          error={Boolean(errors.surname)}
          helperText={errors.surname || ' '}
        />
      </Box>

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
        label="Numer telefonu"
        margin="normal"
        autoComplete="tel"
        placeholder="+48 123 456 789"
        value={values.phoneNumber}
        onChange={handleChange('phoneNumber')}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber || ' '}
        sx={{ mb: -1 }}
      />

      <TextField
        fullWidth
        label="Hasło"
        type="password"
        margin="normal"
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange('password')}
        error={Boolean(errors.password)}
        helperText={errors.password || ' '}
        sx={{ mb: -1 }}
      />

      <TextField
        fullWidth
        label="Potwierdź hasło"
        type="password"
        margin="normal"
        autoComplete="new-password"
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword || ' '}
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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Zarejestruj się'}
      </Button>

      <Typography variant="body2" textAlign="center">
        Masz już konto?{' '}
        <Button
          variant="text"
          onClick={onSwitchToLogin}
          sx={{
            textTransform: 'none',
            p: 0,
            minWidth: 'auto',
            color: 'primary.main',
            fontWeight: 'medium',
          }}
        >
          Zaloguj się
        </Button>
      </Typography>
    </Box>
  );
};

export default RegisterForm;

