import { Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { POLICIES } from '../data/policies.js';

export default function PolicyPage() {
  const { slug } = useParams();
  const policy = POLICIES[slug];
  if (!policy) return <Navigate to="/" replace />;

  return (
    <>
      <PageHero title={policy.title} breadcrumb={[{ label: 'Home', to: '/' }, { label: policy.title }]} />
      <article className="prose prose-neutral mx-auto max-w-3xl px-4 py-12">
        {policy.body.map((para, i) => (
          <p key={i} className="mb-4 text-sm leading-relaxed text-neutral-700">{para}</p>
        ))}
      </article>
    </>
  );
}
