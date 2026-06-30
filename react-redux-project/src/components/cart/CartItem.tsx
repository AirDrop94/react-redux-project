import { Link } from 'react-router-dom';

import { getProductDetailsRoute } from '../../constants/routes';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../store/hooks';
import Button from '../ui/Button';

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

function CartItem({ id, title, price, image, quantity }: CartItemProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="cart-item">
      <Link to={getProductDetailsRoute(id)}>
        <img className="cart-item__image" src={image} alt={title} />
      </Link>

      <div className="cart-item__content">
        <Link className="cart-item__title" to={getProductDetailsRoute(id)}>
          {title}
        </Link>

        <p className="cart-item__price">${price}</p>

        <div className="cart-item__actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() => dispatch(decreaseQuantity(id))}
          >
            -
          </Button>

          <Button
            variant="secondary"
            size="small"
            onClick={() => dispatch(increaseQuantity(id))}
          >
            +
          </Button>

          <Button
            variant="danger"
            size="small"
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;