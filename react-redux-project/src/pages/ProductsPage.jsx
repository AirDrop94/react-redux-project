import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductList from '../components/products/ProductList';
import ProductSearch from '../components/products/ProductSearch';
import { fetchProducts } from '../features/products/productsSlice';

function ProductsPage() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

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