import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import PageHero from '../components/PageHero.jsx';

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api('/cms/public/blogs').then((d) => setPosts(d.posts));
  }, []);

  return (
    <>
      <PageHero title="Blogs & Articles" subtitle="Tips, trends, and stories from ARC LEGACY" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card">
            <img src={post.coverImage || '/images/product-1.jpg'} alt="" className="aspect-video w-full object-cover" />
            <div className="p-5">
              <h2 className="font-serif text-lg text-maroon">
                <Link to={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
              </h2>
              <p className="mt-2 text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-sm text-maroon">Read more →</Link>
            </div>
          </article>
        ))}
        {!posts.length && <p className="text-neutral-500">No articles published yet.</p>}
      </div>
    </>
  );
}
