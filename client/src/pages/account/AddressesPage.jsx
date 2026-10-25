import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';

const emptyForm = {
  label: 'Home',
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: 'Gujarat',
  pincode: '',
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => api('/users/profile').then((d) => setAddresses(d.user.addresses || []));

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api(`/users/addresses/${editingId}`, { method: 'PUT', body: JSON.stringify(form) });
    } else {
      await api('/users/addresses', { method: 'POST', body: JSON.stringify(form) });
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const startEdit = (addr) => {
    setForm({
      label: addr.label,
      fullName: addr.fullName,
      phone: addr.phone,
      line1: addr.line1,
      line2: addr.line2 || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setEditingId(addr._id);
    setShowForm(true);
  };

  const remove = async (id) => {
    if (!confirm('Delete this address?')) return;
    await api(`/users/addresses/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-maroon">My Addresses</h2>
        <button type="button" className="btn-primary text-xs" onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}>
          Add Address
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div key={addr._id} className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex justify-between">
              <span className="font-medium">{addr.label}</span>
              {addr.isDefault && <span className="rounded bg-maroon/10 px-2 text-xs text-maroon">Default</span>}
            </div>
            <p className="mt-2 text-sm text-neutral-700">{addr.fullName}</p>
            <p className="text-sm text-neutral-600">{addr.line1}</p>
            <p className="text-sm text-neutral-600">{addr.city}, {addr.state} {addr.pincode}</p>
            <p className="text-sm text-neutral-600">{addr.phone}</p>
            <div className="mt-3 flex gap-3 text-xs">
              <button type="button" className="text-maroon underline" onClick={() => startEdit(addr)}>Edit</button>
              <button type="button" className="text-neutral-500 underline" onClick={() => remove(addr._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <form onSubmit={save} className="mt-8 max-w-lg space-y-3 rounded-xl border border-neutral-200 bg-white p-6">
          <h3 className="font-medium">{editingId ? 'Edit address' : 'New address'}</h3>
          {['label', 'fullName', 'phone', 'line1', 'line2', 'city', 'state', 'pincode'].map((field) => (
            <label key={field} className="block text-sm capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
              <input
                className="input-field mt-1"
                required={!['line2'].includes(field)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
            Set as default
          </label>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary text-xs">Save</button>
            <button type="button" className="btn-outline text-xs" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
