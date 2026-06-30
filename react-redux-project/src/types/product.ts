export type ProductRating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
};

export type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  isProductLoading: boolean;
  error: string | null;
  productError: string | null;
};