import { createSlice } from '@reduxjs/toolkit';

import { STORAGE_KEYS } from '../../constants/storage';
import { getStorageItem } from '../../utils/localStorage';

const initialState = {
  user: getStorageItem(STORAGE_KEYS.AUTH_USER, null),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;