import { useState } from 'react';

export default function CmsEditor({ title, fields, initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-neutral-200 bg-white p-6 space-y-3">
      <h3 className="font-serif text-lg text-maroon">{title}</h3>
      {fields.map((field) => {
        if (field.type === 'select') {
          return (
            <label key={field.name} className="block text-sm">
              {field.label}
              <select
                className="input-field mt-1"
                value={form[field.name] ?? ''}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              >
                {field.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          );
        }
        if (field.type === 'checkbox') {
          return (
            <label key={field.name} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(form[field.name])}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })}
              />
              {field.label}
            </label>
          );
        }
        if (field.type === 'textarea') {
          return (
            <label key={field.name} className="block text-sm">
              {field.label}
              <textarea
                className="input-field mt-1"
                rows={field.rows || 4}
                value={form[field.name] ?? ''}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              />
            </label>
          );
        }
        return (
          <label key={field.name} className="block text-sm">
            {field.label}
            <input
              className="input-field mt-1"
              type={field.type || 'text'}
              required={field.required}
              value={form[field.name] ?? ''}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
            />
          </label>
        );
      })}
      <div className="flex gap-2 pt-2">
        <button type="submit" className="btn-primary text-xs">Save</button>
        <button type="button" className="btn-outline text-xs" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
