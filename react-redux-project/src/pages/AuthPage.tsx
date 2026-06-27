import { type ChangeEvent, type FormEvent, useState } from 'react';

import { getCartStorageKey } from '../constants/storage';
import { loginUser, logoutUser } from '../features/auth/authSlice';
import { selectAuthUser } from '../features/auth/selectors';
import { validateAuthForm } from '../features/auth/validation';
import { setCartItems } from '../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type {
  AuthFormErrors,
  AuthFormValues,
  AuthUser,
} from '../types/auth';
import type { CartItem } from '../types/cart';
import { getStorageItem } from '../utils/localStorage';
import Button from '../components/ui/Button';

const initialFormValues: AuthFormValues = {
  username: '',
  email: '',
  password: '',
};

function AuthPage() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);

  const [formValues, setFormValues] =
    useState<AuthFormValues>(initialFormValues);
  const [errors, setErrors] = useState<AuthFormErrors>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof AuthFormValues;

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: '',
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAuthForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user: AuthUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
    };

    const userCartItems = getStorageItem<CartItem[]>(
      getCartStorageKey(user),
      [],
    );

    dispatch(loginUser(user));
    dispatch(setCartItems(userCartItems));

    setFormValues(initialFormValues);
    setErrors({});
  };

  const handleLogout = () => {
    const guestCartItems = getStorageItem<CartItem[]>(
      getCartStorageKey(null),
      [],
    );

    dispatch(logoutUser());
    dispatch(setCartItems(guestCartItems));
  };

  if (authUser) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <h1>Profile</h1>

          <p>
            You are logged in as <strong>{authUser.username}</strong>.
          </p>

          <p>Email: {authUser.email}</p>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Authorization</h1>

        <div className="auth-form__field">
          <label htmlFor="username">Login</label>

          <input
            id="username"
            name="username"
            type="text"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter your login"
          />

          {errors.username && (
            <p className="auth-form__error">{errors.username}</p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {errors.email && <p className="auth-form__error">{errors.email}</p>}
        </div>

        <div className="auth-form__field">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {errors.password && (
            <p className="auth-form__error">{errors.password}</p>
          )}
        </div>

        <Button className="auth-form__button" type="submit">
          Login
        </Button>
      </form>
    </section>
  );
}

export default AuthPage;