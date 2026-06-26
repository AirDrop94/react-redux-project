import type { RootState } from '../../store/store';

export const selectProducts = (state: RootState) => state.products.products;

export const selectProductsLoading = (state: RootState) =>
  state.products.isLoading;

export const selectProductsError = (state: RootState) => state.products.error;

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;

export const selectProductLoading = (state: RootState) =>
  state.products.isProductLoading;

export const selectProductError = (state: RootState) =>
  state.products.productError;