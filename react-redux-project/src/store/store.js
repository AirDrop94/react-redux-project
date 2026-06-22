import { configureStore } from '@reduxjs/toolkit';

import { STORAGE_KEYS } from '../constants/storage';
import cartReducer from '../features/cart/cartSlice';
import { selectCartItems } from '../features/cart/selectors';
import productsReducer from '../features/products/productsSlice';
import { setStorageItem } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

let currentCartItems = selectCartItems(store.getState());

store.subscribe(() => {
  const previousCartItems = currentCartItems;
  currentCartItems = selectCartItems(store.getState());

  if (previousCartItems !== currentCartItems) {
    setStorageItem(STORAGE_KEYS.CART_ITEMS, currentCartItems);
  }
});