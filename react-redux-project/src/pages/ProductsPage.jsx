import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import ProductList from '../components/products/ProductList';
import { fetchProducts } from '../features/products/productsSlice';

function ProductsPage() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

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
        <ProductList products={products} />
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}

export default ProductsPage;