import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { addToCart } from '../features/cart/cartSlice';
import {
  selectProductError,
  selectProductLoading,
  selectSelectedProduct,
} from '../features/products/selectors';
import { fetchProductById } from '../features/products/productsThunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function ProductDetailsPage() {
  const { productId } = useParams();

  const dispatch = useAppDispatch();

  const selectedProduct = useAppSelector(selectSelectedProduct);
  const isLoading = useAppSelector(selectProductLoading);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  if (!productId) {
    return (
      <ErrorMessage message="Product id was not found in the route." />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchProductById(productId))}
      />
    );
  }

  if (!selectedProduct) {
    return <ErrorMessage message="Product not found." />;
  }

  return (
    <section className="product-details">
      <img
        className="product-details__image"
        src={selectedProduct.image}
        alt={selectedProduct.title}
      />

      <div className="product-details__content">
        <p className="product-details__category">
          {selectedProduct.category}
        </p>

        <h1>{selectedProduct.title}</h1>

        <p className="product-details__description">
          {selectedProduct.description}
        </p>

        <p className="product-details__price">
          ${selectedProduct.price}
        </p>

        <button
          className="product-details__button"
          type="button"
          onClick={() => dispatch(addToCart(selectedProduct))}
        >
          Add to cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetailsPage;