import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';
import PageHero from '../components/PageHero.jsx';
import { loadRazorpayScript, openRazorpayCheckout } from '../utils/razorpayCheckout.js';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [razorpayEnabled, setRazorpayEnabled] = useState(false);
  const [manual, setManual] = useState({
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '',
  });
  const [useManual, setUseManual] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  useEffect(() => {
    api('/payments/config').then((c) => setRazorpayEnabled(c.enabled));
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    if (!items.length) {
      navigate('/cart');
      return;
    }
    api('/users/profile').then((d) => {
      setAddresses(d.user.addresses || []);
      const def = d.user.addresses?.find((a) => a.isDefault);
      if (def) setSelectedAddressId(def._id);
      setManual((m) => ({ ...m, fullName: d.user.name, phone: d.user.phone || '' }));
    });
  }, [user, items.length, navigate]);

  const getShippingAddress = () => {
    if (useManual) return manual;
    const addr = addresses.find((a) => a._id === selectedAddressId);
    if (!addr) return null;
    return {
      fullName: addr.fullName,
      phone: addr.phone,
      line1: addr.line1,
      line2: addr.line2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
    };
  };

  const payloadBase = () => {
    const shippingAddress = getShippingAddress();
    return {
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      shippingAddress,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: shippingAddress?.phone || user.phone,
    };
  };

  const placeCodOrder = async () => {
    const shippingAddress = getShippingAddress();
    if (!shippingAddress?.line1 || !shippingAddress.pincode) {
      setError('Please select or enter a complete delivery address');
      return;
    }
    setPlacing(true);
    setError('');
    try {
      const { order } = await api('/orders', {
        method: 'POST',
        body: JSON.stringify({ ...payloadBase(), paymentMethod: 'cod' }),
      });
      clearCart();
      navigate('/order-success', { state: { orderNumber: order.orderNumber, total: order.total } });
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  const payWithRazorpay = async () => {
    const shippingAddress = getShippingAddress();
    if (!shippingAddress?.line1 || !shippingAddress.pincode) {
      setError('Please select or enter a complete delivery address');
      return;
    }
    setPlacing(true);
    setError('');
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Could not load Razorpay');

      const prep = await api('/payments/razorpay/prepare', {
        method: 'POST',
        body: JSON.stringify(payloadBase()),
      });

      openRazorpayCheckout({
        keyId: prep.keyId,
        amount: prep.amount,
        currency: prep.currency,
        orderId: prep.razorpayOrderId,
        name: user.name,
        email: user.email,
        phone: shippingAddress.phone || user.phone,
        onSuccess: async (response) => {
          try {
            const { order } = await api('/payments/razorpay/verify', {
              method: 'POST',
              body: JSON.stringify({
                intentId: prep.intentId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            clearCart();
            navigate('/order-success', { state: { orderNumber: order.orderNumber, total: order.total } });
          } catch (err) {
            setError(err.message);
          } finally {
            setPlacing(false);
          }
        },
      });
      setPlacing(false);
    } catch (err) {
      setError(err.message);
      setPlacing(false);
    }
  };

  const placeOrder = () => {
    if (paymentMethod === 'razorpay') payWithRazorpay();
    else placeCodOrder();
  };

  return (
    <>
      <PageHero title="Checkout" subtitle="Review address and payment" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="font-serif text-lg text-maroon">Delivery address</h2>
            {addresses.length > 0 && !useManual && (
              <ul className="mt-4 space-y-3">
                {addresses.map((addr) => (
                  <li key={addr._id}>
                    <label className="flex cursor-pointer gap-3 rounded-lg border p-3 has-[:checked]:border-maroon">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === addr._id}
                        onChange={() => setSelectedAddressId(addr._id)}
                      />
                      <div className="text-sm">
                        <div className="font-medium">{addr.label} {addr.isDefault && '(Default)'}</div>
                        <div>{addr.fullName}, {addr.line1}, {addr.city} {addr.pincode}</div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <button type="button" className="mt-3 text-sm text-maroon underline" onClick={() => setUseManual(!useManual)}>
              {useManual ? 'Use saved address' : 'Enter address manually'}
            </button>
            {useManual && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {['fullName', 'phone', 'line1', 'line2', 'city', 'state', 'pincode'].map((f) => (
                  <label key={f} className="block text-sm capitalize sm:col-span-1">
                    {f}
                    <input className="input-field mt-1" required={f !== 'line2'} value={manual[f]} onChange={(e) => setManual({ ...manual, [f]: e.target.value })} />
                  </label>
                ))}
              </div>
            )}
            <Link to="/account/addresses" className="mt-3 inline-block text-xs text-neutral-500 underline">Manage addresses</Link>
          </section>

          <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="font-serif text-lg text-maroon">Payment</h2>
            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-[:checked]:border-maroon">
              <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
              <span className="text-sm">Cash on Delivery (COD)</span>
            </label>
            <label className={`mt-2 flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-[:checked]:border-maroon ${!razorpayEnabled ? 'opacity-50' : ''}`}>
              <input
                type="radio"
                checked={paymentMethod === 'razorpay'}
                disabled={!razorpayEnabled}
                onChange={() => setPaymentMethod('razorpay')}
              />
              <span className="text-sm">Pay online (Razorpay — UPI, cards, netbanking)</span>
            </label>
            {!razorpayEnabled && (
              <p className="mt-2 text-xs text-neutral-500">Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable online pay.</p>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl text-maroon">Order Summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-2">
                <span className="truncate">{i.title} × {i.quantity}</span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between font-semibold text-maroon"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button type="button" className="btn-primary mt-6 w-full" disabled={placing} onClick={placeOrder}>
            {placing ? 'Processing…' : paymentMethod === 'razorpay' ? 'Pay with Razorpay' : 'Place Order'}
          </button>
        </aside>
      </div>
    </>
  );
}
