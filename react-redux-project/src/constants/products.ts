export const PRODUCT_CATEGORIES = {
  ALL: 'all',
} as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];