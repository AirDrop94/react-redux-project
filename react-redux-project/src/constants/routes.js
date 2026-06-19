export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:productId',
  CART: '/cart',
};

export const getProductDetailsRoute = (productId) =>
  `${ROUTES.PRODUCTS}/${productId}`;