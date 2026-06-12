import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__link">
          Home
        </NavLink>

        <NavLink to="/products" className="nav__link">
          Products
        </NavLink>

        <NavLink to="/about" className="nav__link">
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;