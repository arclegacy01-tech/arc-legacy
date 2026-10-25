import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import PageHero from '../components/PageHero.jsx';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api(`/cms/public/blogs/${slug}`).then((d) => setPost(d.post)).catch(() => setPost(null));
  }, [slug]);

  if (!post) return <p className="py-20 text-center">Article not found.</p>;

  return (
    <>
      <PageHero title={post.title} subtitle={post.excerpt} breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title }]} />
      <article className="mx-auto max-w-3xl px-4 py-12">
        {post.coverImage && <img src={post.coverImage} alt="" className="mb-8 rounded-2xl w-full object-cover max-h-96" />}
        <div className="prose prose-neutral text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
        <Link to="/blog" className="mt-10 inline-block text-maroon">← Back to blog</Link>
      </article>
    </>
  );
}
