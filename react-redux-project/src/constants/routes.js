export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:productId',
};

export const getProductDetailsRoute = (productId) =>
  `${ROUTES.PRODUCTS}/${productId}`;