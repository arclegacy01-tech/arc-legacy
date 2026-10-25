export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function openRazorpayCheckout({ keyId, amount, currency, orderId, name, email, phone, onSuccess }) {
  const options = {
    key: keyId,
    amount,
    currency,
    name: 'ARC LEGACY',
    description: 'Order payment',
    order_id: orderId,
    prefill: { name, email, contact: phone },
    theme: { color: '#6B1E2E' },
    handler: (response) => {
      onSuccess(response);
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}
