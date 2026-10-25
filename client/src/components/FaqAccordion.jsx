import { useState } from 'react';

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  if (!faqs?.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-center font-serif text-2xl text-maroon">Frequently Asked Questions</h2>
      <ul className="mt-8 space-y-3">
        {faqs.map((faq, i) => (
          <li key={faq._id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.question}
              <span className="text-maroon">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="border-t border-neutral-100 px-5 py-4 text-sm text-neutral-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
