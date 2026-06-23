import { createSlice } from '@reduxjs/toolkit';

import { getCartStorageKey, STORAGE_KEYS } from '../../constants/storage';
import { getStorageItem } from '../../utils/localStorage';

const authUser = getStorageItem(STORAGE_KEYS.AUTH_USER, null);

const initialState = {
  items: getStorageItem(getCartStorageKey(authUser), []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload,
      );

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (cartItem) => cartItem.id !== action.payload,
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;