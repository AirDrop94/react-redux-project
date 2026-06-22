import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser, logoutUser } from '../features/auth/authSlice';
import { selectAuthUser } from '../features/auth/selectors';
import { validateAuthForm } from '../features/auth/validation';

const initialFormValues = {
  username: '',
  email: '',
  password: '',
};

function AuthPage() {
  const dispatch = useDispatch();
  const authUser = useSelector(selectAuthUser);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateAuthForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      loginUser({
        username: formValues.username.trim(),
        email: formValues.email.trim(),
      }),
    );

    setFormValues(initialFormValues);
    setErrors({});
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

          <button type="button" onClick={() => dispatch(logoutUser())}>
            Logout
          </button>
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

        <button className="auth-form__button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default AuthPage;