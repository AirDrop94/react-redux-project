import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { STORAGE_KEYS } from '../../constants/storage';
import type { AuthState, AuthUser } from '../../types/auth';
import { getStorageItem } from '../../utils/localStorage';

const initialState: AuthState = {
  user: getStorageItem<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;