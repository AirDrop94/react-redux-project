export const selectAuthUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => Boolean(state.auth.user);