import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProductDetailsRoute } from '../../constants/routes';
import { addToCart } from '../../features/cart/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link
        className="product-card__image-link"
        to={getProductDetailsRoute(product.id)}
      >
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
        />
      </Link>

      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>

        <Link
          className="product-card__title-link"
          to={getProductDetailsRoute(product.id)}
        >
          <h3 className="product-card__title">{product.title}</h3>
        </Link>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <p className="product-card__price">${product.price}</p>

          {product.rating && (
            <p className="product-card__rating">
              Rating: {product.rating.rate} / 5
            </p>
          )}
        </div>

        <button
          className="product-card__button"
          type="button"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;