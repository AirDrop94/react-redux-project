import { Link } from 'react-router-dom';

import { getProductDetailsRoute } from '../../constants/routes';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../store/hooks';

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
          <button type="button" onClick={() => dispatch(decreaseQuantity(id))}>
            -
          </button>

          <span>{quantity}</span>

          <button type="button" onClick={() => dispatch(increaseQuantity(id))}>
            +
          </button>

          <button type="button" onClick={() => dispatch(removeFromCart(id))}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;