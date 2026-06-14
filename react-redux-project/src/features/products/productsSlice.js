import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      title: 'Backpack',
      price: 49.99,
      category: 'bags',
      image: 'https://placehold.co/300x300?text=Backpack',
    },
    {
      id: 2,
      title: 'T-Shirt',
      price: 19.99,
      category: 'clothes',
      image: 'https://placehold.co/300x300?text=T-Shirt',
    },
    {
      id: 3,
      title: 'Sneakers',
      price: 89.99,
      category: 'shoes',
      image: 'https://placehold.co/300x300?text=Sneakers',
    },
  ],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError} = productSlice.actions;

export default productSlice.reducer;