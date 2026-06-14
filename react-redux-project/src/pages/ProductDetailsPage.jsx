import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import {
  clearSelectedProduct,
  fetchProductById,
} from '../features/products/productsSlice';

function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct,
  );

  const isProductLoading = useSelector(
    (state) => state.products.isProductLoading,
  );

  const productError = useSelector((state) => state.products.productError);

  useEffect(() => {
    dispatch(fetchProductById(productId));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  if (isProductLoading) {
    return <Loader />;
  }

  if (productError) {
    return (
      <ErrorMessage
        message={productError}
        onRetry={() => dispatch(fetchProductById(productId))}
      />
    );
  }

  if (!selectedProduct) {
    return (
      <section>
        <h1>Product not found</h1>

        <Link to="/products">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="product-details">
      <Link className="product-details__back" to="/products">
        Back to products
      </Link>

      <div className="product-details__content">
        <img
          className="product-details__image"
          src={selectedProduct.image}
          alt={selectedProduct.title}
        />

        <div>
          <p className="product-details__category">
            {selectedProduct.category}
          </p>

          <h1 className="product-details__title">{selectedProduct.title}</h1>

          <p className="product-details__description">
            {selectedProduct.description}
          </p>

          <p className="product-details__price">${selectedProduct.price}</p>

          {selectedProduct.rating && (
            <p className="product-details__rating">
              Rating: {selectedProduct.rating.rate} / 5 | Reviews:{' '}
              {selectedProduct.rating.count}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;