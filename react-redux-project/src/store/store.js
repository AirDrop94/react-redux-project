import { configureStore } from '@reduxjs/toolkit';

import { getCartStorageKey, STORAGE_KEYS } from '../constants/storage';
import authReducer from '../features/auth/authSlice';
import { selectAuthUser } from '../features/auth/selectors';
import cartReducer from '../features/cart/cartSlice';
import { selectCartItems } from '../features/cart/selectors';
import productsReducer from '../features/products/productsSlice';
import { setStorageItem } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

let currentCartItems = selectCartItems(store.getState());
let currentAuthUser = selectAuthUser(store.getState());

store.subscribe(() => {
  const previousCartItems = currentCartItems;
  const previousAuthUser = currentAuthUser;

  currentCartItems = selectCartItems(store.getState());
  currentAuthUser = selectAuthUser(store.getState());

  if (previousCartItems !== currentCartItems) {
    setStorageItem(getCartStorageKey(currentAuthUser), currentCartItems);
  }

  if (previousAuthUser !== currentAuthUser) {
    setStorageItem(STORAGE_KEYS.AUTH_USER, currentAuthUser);
  }
});