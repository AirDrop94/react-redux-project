export const selectProducts = (state) => state.products.products;

export const selectProductsLoading = (state) => state.products.isLoading;

export const selectProductsError = (state) => state.products.error;

export const selectSelectedProduct = (state) =>
  state.products.selectedProduct;

export const selectProductLoading = (state) =>
  state.products.isProductLoading;

export const selectProductError = (state) => state.products.productError;