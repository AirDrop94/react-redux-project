import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductList from '../components/products/ProductList';
import ProductSearch from '../components/products/ProductSearch';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from '../features/products/selectors';
import { fetchProducts } from '../features/products/productsThunks';
import { PRODUCT_CATEGORIES } from '../constants/products';

function ProductsPage() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    PRODUCT_CATEGORIES.ALL,
  );
  const [searchValue, setSearchValue] = useState('');

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === PRODUCT_CATEGORIES.ALL || product.category === selectedCategory;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchValue.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchValue]);

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <section>
      <h1>Products Page</h1>
      <p>Products are loaded from an external API.</p>

      {products.length > 0 ? (
        <>
          <ProductSearch
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p>No products found.</p>
          )}
        </>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}

export default ProductsPage;