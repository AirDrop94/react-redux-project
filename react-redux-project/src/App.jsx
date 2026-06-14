import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'products',
        element: <ProductsPage/>,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App;