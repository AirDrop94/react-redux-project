import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTES } from '../constants/routes';
import { logoutUser } from '../features/auth/authSlice';
import { selectAuthUser } from '../features/auth/selectors';
import { selectCartTotalQuantity } from '../features/cart/selectors';

function Header() {
  const dispatch = useDispatch();

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const authUser = useSelector(selectAuthUser);

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to={ROUTES.HOME} className="nav__link">
          Home
        </NavLink>

        <NavLink to={ROUTES.PRODUCTS} className="nav__link">
          Products
        </NavLink>

        <NavLink to={ROUTES.CART} className="nav__link">
          Cart ({cartTotalQuantity})
        </NavLink>

        <NavLink to={ROUTES.ABOUT} className="nav__link">
          About
        </NavLink>

        <NavLink to={ROUTES.AUTH} className="nav__link">
          {authUser ? authUser.username : 'Login'}
        </NavLink>

        {authUser && (
          <button
            className="nav__button"
            type="button"
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;