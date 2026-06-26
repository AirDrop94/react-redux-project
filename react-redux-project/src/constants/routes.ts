export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:productId',
  CART: '/cart',
  AUTH: '/auth',
} as const;

export const getProductDetailsRoute = (productId: number | string): string =>
  `${ROUTES.PRODUCTS}/${productId}`;