import type { AuthFormErrors, AuthFormValues } from '../../types/auth';

export const validateAuthForm = ({
  username,
  email,
  password,
}: AuthFormValues): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (!username.trim()) {
    errors.username = 'Login is required';
  } else if (username.trim().length < 3) {
    errors.username = 'Login must be at least 3 characters';
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};