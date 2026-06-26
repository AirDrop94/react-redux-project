import { NavLink } from 'react-router-dom';

import { getCartStorageKey } from '../constants/storage';
import { ROUTES } from '../constants/routes';
import { logoutUser } from '../features/auth/authSlice';
import { selectAuthUser } from '../features/auth/selectors';
import { setCartItems } from '../features/cart/cartSlice';
import { selectCartTotalQuantity } from '../features/cart/selectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { CartItem } from '../types/cart';
import { getStorageItem } from '../utils/localStorage';

function Header() {
  const dispatch = useAppDispatch();

  const cartTotalQuantity = useAppSelector(selectCartTotalQuantity);
  const authUser = useAppSelector(selectAuthUser);

  const handleLogout = () => {
    const guestCartItems = getStorageItem<CartItem[]>(
      getCartStorageKey(null),
      [],
    );

    dispatch(logoutUser());
    dispatch(setCartItems(guestCartItems));
  };

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
          <button className="nav__button" type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;