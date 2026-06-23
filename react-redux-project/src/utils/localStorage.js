
export const getStorageItem = (key, fallbackValue) => {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return fallbackValue;
    }

    return JSON.parse(item);
  } catch {
    return fallbackValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore localStorage errors
  }
};