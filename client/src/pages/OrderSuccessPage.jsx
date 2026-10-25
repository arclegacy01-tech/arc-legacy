import { Link, useLocation, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/format.js';
import PageHero from '../components/PageHero.jsx';

export default function OrderSuccessPage() {
  const { state } = useLocation();
  if (!state?.orderNumber) return <Navigate to="/" replace />;

  return (
    <>
      <PageHero title="Thank you!" subtitle="Your order has been placed" breadcrumb={[]} />
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-lg">Order <strong className="text-maroon">#{state.orderNumber}</strong> confirmed.</p>
        {state.total && <p className="mt-2 text-neutral-600">Total paid: {formatPrice(state.total)}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/account/orders" className="btn-primary text-xs">View my orders</Link>
          <Link to={`/track-order?orderNumber=${state.orderNumber}`} className="btn-outline text-xs">Track order</Link>
          <Link to="/" className="text-sm text-maroon underline">Continue shopping</Link>
        </div>
      </div>
    </>
  );
}
