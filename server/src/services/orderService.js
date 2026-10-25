import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

export async function nextOrderNumber() {
  const count = await Order.countDocuments();
  return `AL${String(10000 + count + 1)}`;
}

export async function buildOrderFromItems(items) {
  const lineItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product || !product.isActive) {
      throw new Error(`Product unavailable: ${item.productId}`);
    }
    const qty = Math.max(1, Number(item.quantity) || 1);
    if (product.trackStock && product.stock < qty) {
      throw new Error(`Insufficient stock for ${product.title}`);
    }
    const mainImage = product.images?.find((i) => i.isMain)?.url || product.images?.[0]?.url;
    lineItems.push({
      product: product._id,
      title: product.title,
      image: mainImage,
      unit: product.unit,
      price: product.price,
      quantity: qty,
      variationId: item.variationId,
      variationLabel: item.variationLabel,
    });
    subtotal += product.price * qty;
  }

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  return { lineItems, subtotal, shipping, total };
}

export async function deductStock(lineItems) {
  for (const line of lineItems) {
    const product = await Product.findById(line.product);
    if (product?.trackStock) {
      product.stock -= line.quantity;
      await product.save();
    }
  }
}

export async function createOrder({
  userId,
  items,
  shippingAddress,
  paymentMethod,
  customerName,
  customerEmail,
  customerPhone,
  paymentStatus = 'pending',
  razorpayOrderId,
  razorpayPaymentId,
}) {
  if (!items?.length) throw new Error('Cart is empty');
  if (!shippingAddress?.line1 || !shippingAddress?.pincode) {
    throw new Error('Complete shipping address is required');
  }

  const { lineItems, subtotal, shipping, total } = await buildOrderFromItems(items);
  const orderNumber = await nextOrderNumber();

  const order = await Order.create({
    orderNumber,
    user: userId,
    customerName,
    customerEmail,
    customerPhone,
    items: lineItems,
    subtotal,
    shipping,
    total,
    paymentMethod: paymentMethod || 'cod',
    paymentStatus,
    status: 'pending',
    shippingAddress,
    razorpayOrderId,
    razorpayPaymentId,
  });

  await deductStock(lineItems);
  return order;
}
