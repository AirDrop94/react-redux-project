import { Link } from 'react-router-dom';

import { getProductDetailsRoute } from '../../constants/routes';
import { addToCart } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../store/hooks';
import type { Product } from '../../types/product';
import Button from '../ui/Button';

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card">
      <Link to={getProductDetailsRoute(product.id)}>
        <img
          className="product-card__image"
          src={product.image}
          alt={product.title}
        />
      </Link>

      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>

        <Link
          className="product-card__title"
          to={getProductDetailsRoute(product.id)}
        >
          {product.title}
        </Link>

        <p className="product-card__price">${product.price}</p>

        <Button
          className="product-card__button"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;