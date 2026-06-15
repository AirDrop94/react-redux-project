import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductList from '../components/products/ProductList';
import { fetchProducts } from '../features/products/productsSlice';

function ProductsPage() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

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
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p>No products found in this category.</p>
          )}
        </>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}

export default ProductsPage;