import { Link } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

function NotFoundPage() {
  return (
    <section>
      <h1>Page not found</h1>

      <p>The page you are looking for does not exist.</p>

      <Link to={ROUTES.HOME}>Go to home page</Link>
    </section>
  );
}

export default NotFoundPage;