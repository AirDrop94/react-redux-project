import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProductDetailsRoute } from '../../constants/routes';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <Link to={getProductDetailsRoute(item.id)}>
        <img className="cart-item__image" src={item.image} alt={item.title} />
      </Link>

      <div className="cart-item__content">
        <Link className="cart-item__title" to={getProductDetailsRoute(item.id)}>
          {item.title}
        </Link>

        <p className="cart-item__price">${item.price}</p>

        <div className="cart-item__actions">
          <button
            type="button"
            onClick={() => dispatch(decreaseQuantity(item.id))}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={() => dispatch(increaseQuantity(item.id))}
          >
            +
          </button>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;