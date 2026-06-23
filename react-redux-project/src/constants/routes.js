export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:productId',
  CART: '/cart',
  AUTH: '/auth',
};

export const getProductDetailsRoute = (productId) =>
  `${ROUTES.PRODUCTS}/${productId}`;