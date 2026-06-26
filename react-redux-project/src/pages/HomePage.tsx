import { Link } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

function HomePage() {
  return (
    <section>
      <h1>Home Page</h1>

      <p>Welcome to our React Redux shop.</p>

      <Link to={ROUTES.PRODUCTS}>Go to products</Link>
    </section>
  );
}

export default HomePage;