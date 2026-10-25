import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatPrice, unitLabel } from '../utils/format.js';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const checkout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <>
      <div className="bg-blush py-10 text-center">
        <h1 className="font-serif text-3xl text-maroon">Your Cart</h1>
        <p className="mt-2 text-sm text-neutral-600">{items.length} line items</p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {!items.length && (
            <p className="rounded-xl border border-dashed border-neutral-300 py-16 text-center">
              Your cart is empty. <Link to="/" className="text-maroon underline">Continue shopping</Link>
            </p>
          )}
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4">
              <img src={item.image} alt="" className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex flex-1 flex-col">
                <Link to={`/product/${item.slug}`} className="font-medium hover:text-maroon">{item.title}</Link>
                <p className="text-sm text-maroon">{formatPrice(item.price)} / {unitLabel(item.unit)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-neutral-200 text-sm">
                    <button type="button" className="px-3" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                    <span className="px-2">{item.quantity}</span>
                    <button type="button" className="px-3" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    <button type="button" className="text-neutral-400 hover:text-maroon" onClick={() => removeItem(item.productId)}>✕</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length > 0 && (
            <button type="button" className="text-sm text-neutral-500 underline" onClick={clearCart}>
              Clear cart
            </button>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl text-maroon">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-semibold">
              <dt>Total</dt><dd className="text-maroon">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="btn-primary mt-6 w-full"
            disabled={!items.length}
            onClick={checkout}
          >
            Proceed to Checkout
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500">Secure checkout · COD available</p>
        </aside>
      </div>
    </>
  );
}
