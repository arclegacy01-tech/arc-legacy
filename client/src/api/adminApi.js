import { api } from './client.js';

export async function fetchAdminDashboard() {
  return api('/admin/dashboard');
}

export async function fetchAdminOrders(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`/orders${query ? `?${query}` : ''}`);
}

export async function updateAdminOrderStatus(id, status) {
  return api(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function fetchAdminCustomers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`/admin/customers${query ? `?${query}` : ''}`);
}

export async function fetchAdminInventory(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`/admin/inventory${query ? `?${query}` : ''}`);
}

export async function updateAdminStock(productId, stock) {
  return api(`/admin/inventory/${productId}/stock`, {
    method: 'PATCH',
    body: JSON.stringify({ stock }),
  });
}

export async function fetchAdminReports(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`/admin/reports${query ? `?${query}` : ''}`);
}

export async function fetchAdminWholesale(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`/admin/wholesale${query ? `?${query}` : ''}`);
}

export async function updateAdminWholesaleStatus(id, status) {
  return api(`/admin/wholesale/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function fetchAdminProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return api(`/products${query ? `?${query}` : ''}`);
}

export async function deleteAdminProduct(id) {
  return api(`/products/${id}`, {
    method: 'DELETE',
  });
}


