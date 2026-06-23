export const STORAGE_KEYS = {
  AUTH_USER: 'authUser',
  GUEST_CART_ITEMS: 'guestCartItems',
  USER_CART_ITEMS: 'userCartItems',
};

export const getCartStorageKey = (user) => {
  if (!user?.email) {
    return STORAGE_KEYS.GUEST_CART_ITEMS;
  }

  return `${STORAGE_KEYS.USER_CART_ITEMS}:${user.email}`;
};