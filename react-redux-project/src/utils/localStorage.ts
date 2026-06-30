export const getStorageItem = <T>(key: string, fallbackValue: T): T => {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return fallbackValue;
    }

    return JSON.parse(item) as T;
  } catch {
    return fallbackValue;
  }
};

export const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore localStorage errors
  }
};