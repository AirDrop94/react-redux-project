import { Link } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404</h1>

      <p>Page not found.</p>

      <Link to={ROUTES.HOME}>Back to home</Link>
    </section>
  );
}

export default NotFoundPage;