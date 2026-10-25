import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../../api/client.js';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { formatPrice, unitLabel } from '../../utils/format.js';
import { useCart } from '../../context/CartContext.jsx';

export default function AccountDashboardPage() {
  const location = useLocation();
  const { products: wishlist } = useWishlist();
  const { addItem } = useCart();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api('/users/profile').then((d) => setProfile(d.user));
    api('/orders/my').then((d) => setOrders(d.orders.slice(0, 4)));
  }, []);

  return (
    <div className="space-y-8">
      {location.state?.orderPlaced && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Order <strong>{location.state.orderPlaced}</strong> placed successfully!{' '}
          <Link to="/account/orders" className="underline">View orders</Link>
        </div>
      )}

      <div className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="font-serif text-xl text-maroon">Welcome back</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-center text-sm">
          <div className="rounded-lg bg-cream-dark p-4">
            <div className="text-2xl font-semibold text-maroon">{orders.length}</div>
            <div className="text-neutral-600">Recent orders</div>
          </div>
          <div className="rounded-lg bg-cream-dark p-4">
            <div className="text-2xl font-semibold text-maroon">{wishlist.length}</div>
            <div className="text-neutral-600">Wishlist items</div>
          </div>
          <div className="rounded-lg bg-cream-dark p-4">
            <div className="text-2xl font-semibold text-maroon">{profile?.addresses?.length || 0}</div>
            <div className="text-neutral-600">Saved addresses</div>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-4 flex justify-between">
          <h2 className="font-serif text-xl text-maroon">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm text-maroon">View all</Link>
        </div>
        {!orders.length && <p className="text-sm text-neutral-500">No orders yet.</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          {orders.map((order) => (
            <div key={order._id} className="rounded-xl border border-neutral-200 bg-white p-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">#{order.orderNumber}</span>
                <span className="capitalize text-maroon">{order.status}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-600">{formatPrice(order.total)}</p>
              <Link to={`/account/orders/${order._id}`} className="mt-2 inline-block text-xs text-maroon underline">
                View details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {wishlist.length > 0 && (
        <section>
          <div className="mb-4 flex justify-between">
            <h2 className="font-serif text-xl text-maroon">Wishlist</h2>
            <Link to="/wishlist" className="text-sm text-maroon">View all</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {wishlist.slice(0, 4).map((p) => (
              <div key={p._id} className="min-w-[180px] rounded-xl border border-neutral-200 bg-white p-3">
                <img src={p.images?.[0]?.url || '/images/product-1.jpg'} alt="" className="aspect-square w-full rounded-lg object-cover" />
                <p className="mt-2 line-clamp-2 text-sm">{p.title}</p>
                <p className="text-xs text-maroon">{formatPrice(p.price)} / {unitLabel(p.unit)}</p>
                <button type="button" className="btn-primary mt-2 w-full text-[10px] py-1.5" onClick={() => addItem(p, 1)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
