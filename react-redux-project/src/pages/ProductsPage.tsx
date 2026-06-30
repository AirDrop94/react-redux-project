import { useEffect, useMemo, useState } from 'react';

import CategoryFilter from '../components/products/CategoryFilter';
import ProductList from '../components/products/ProductList';
import ProductSearch from '../components/products/ProductSearch';
import ProductSort from '../components/products/ProductSort';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { PRODUCT_CATEGORIES } from '../constants/products';
import { SORT_OPTIONS, type SortOption } from '../constants/sort';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from '../features/products/selectors';
import { fetchProducts } from '../features/products/productsThunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { Product } from '../types/product';

function ProductsPage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    PRODUCT_CATEGORIES.ALL,
  );
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState<SortOption>(
    SORT_OPTIONS.DEFAULT,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let visibleProducts: Product[] = [...products];

    if (selectedCategory !== PRODUCT_CATEGORIES.ALL) {
      visibleProducts = visibleProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (searchValue.trim()) {
      visibleProducts = visibleProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
      );
    }

    switch (sortValue) {
      case SORT_OPTIONS.PRICE_ASC:
        visibleProducts.sort((a, b) => a.price - b.price);
        break;

      case SORT_OPTIONS.PRICE_DESC:
        visibleProducts.sort((a, b) => b.price - a.price);
        break;

      case SORT_OPTIONS.TITLE_ASC:
        visibleProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case SORT_OPTIONS.TITLE_DESC:
        visibleProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case SORT_OPTIONS.DEFAULT:
      default:
        break;
    }

    return visibleProducts;
  }, [products, selectedCategory, searchValue, sortValue]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchProducts())}
      />
    );
  }

  return (
    <section className="products-page">
      <h1>Products</h1>

      <p>Products are loaded from an external API.</p>

      <div className="products-page__controls">
        <ProductSearch
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <ProductSort
          sortValue={sortValue}
          onSortChange={setSortValue}
        />
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductList products={filteredProducts} />
    </section>
  );
}

export default ProductsPage;