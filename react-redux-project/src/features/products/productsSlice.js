import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.productError = null;
    },
  },
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

export const { clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;