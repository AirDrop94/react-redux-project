import { NavLink } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to={ROUTES.HOME} className="nav__link">
          Home
        </NavLink>

        <NavLink to={ROUTES.PRODUCTS} className="nav__link">
          Products
        </NavLink>

        <NavLink to={ROUTES.ABOUT} className="nav__link">
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;