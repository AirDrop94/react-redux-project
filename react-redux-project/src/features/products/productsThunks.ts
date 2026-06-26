import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Product } from '../../types/product';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = (await response.json()) as Product[];

    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchProductById = createAsyncThunk<
  Product,
  string | number,
  { rejectValue: string }
>('products/fetchProductById', async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    const data = (await response.json()) as Product;

    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});