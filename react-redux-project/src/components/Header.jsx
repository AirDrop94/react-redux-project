import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ROUTES } from '../constants/routes';
import { selectCartTotalQuantity } from '../features/cart/selectors';

function Header() {
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

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
      </nav>
    </header>
  );
}

export default Header;