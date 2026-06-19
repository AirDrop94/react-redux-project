import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../components/cart/CartItem';
import { ROUTES } from '../constants/routes';
import { clearCart } from '../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../features/cart/selectors';

function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1>Cart</h1>

        <p>Your cart is empty.</p>

        <Link to={ROUTES.PRODUCTS}>Go to products</Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Cart</h1>

      <div className="cart-page__content">
        <div className="cart-page__items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="cart-page__summary">
          <h2>Order summary</h2>

          <p>Total items: {totalQuantity}</p>

          <p>Total price: ${totalPrice.toFixed(2)}</p>

          <button type="button" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;