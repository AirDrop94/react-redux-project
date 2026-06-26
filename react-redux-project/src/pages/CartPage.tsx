import CartItem from '../components/cart/CartItem';
import { clearCart } from '../features/cart/cartSlice';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../features/cart/selectors';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1>Cart</h1>

        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Cart</h1>

      <div className="cart-page__content">
        <div className="cart-page__items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
            />
          ))}
        </div>

        <div className="cart-page__summary">
          <h2>Order summary</h2>

          <p>Total quantity: {totalQuantity}</p>

          <p>Total price: ${totalPrice.toFixed(2)}</p>

          <button type="button" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default CartPage;