import { createSlice } from '@reduxjs/toolkit';

import { fetchProductById, fetchProducts } from './productsThunks';


const initialState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  isProductLoading: false,
  error: null,
  productError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isProductLoading = true;
        state.productError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isProductLoading = false;
        state.productError = action.payload || 'Something went wrong';
      });
  },
});

export default productsSlice.reducer;