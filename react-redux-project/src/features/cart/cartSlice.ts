import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getCartStorageKey, STORAGE_KEYS } from '../../constants/storage';
import type { AuthUser } from '../../types/auth';
import type { CartItem, CartState } from '../../types/cart';
import type { Product } from '../../types/product';
import { getStorageItem } from '../../utils/localStorage';

const authUser = getStorageItem<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null);

const initialState: CartState = {
  items: getStorageItem<CartItem[]>(getCartStorageKey(authUser), []),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    addToCart: (state, action: PayloadAction<Product>) => {
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

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
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