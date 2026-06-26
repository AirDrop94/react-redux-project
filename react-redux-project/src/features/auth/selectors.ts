import type { RootState } from '../../store/store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.user);