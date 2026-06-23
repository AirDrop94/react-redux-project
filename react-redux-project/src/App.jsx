import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import { ROUTES } from './constants/routes';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: ROUTES.PRODUCT_DETAILS,
        element: <ProductDetailsPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.AUTH,
        element: <AuthPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;