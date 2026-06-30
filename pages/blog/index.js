import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getBlogPosts, getBlogCategories } from '../../lib/data';
import PostCard from '../../components/blog/PostCard';

export default function BlogList({ allPosts, categories }) {
  const router = useRouter();
  const currentCategory = router.query.category || '';
  const searchQuery = (router.query.search || '').toLowerCase();

  let posts = allPosts;
  if (currentCategory) posts = posts.filter((p) => p.category_slug === currentCategory);
  if (searchQuery) {
    posts = posts.filter(
      (p) => p.title.toLowerCase().includes(searchQuery) || p.excerpt.toLowerCase().includes(searchQuery)
    );
  }

  const filterByCategory = (slug) => router.push(slug ? `/blog?category=${slug}` : '/blog');

  return (
    <>
      <Head>
        <title>Blog — StudentCalc</title>
        <meta name="description" content="40+ in-depth guides on study abroad, career, finance, education, and programming for students." />
      </Head>
      <section style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div className="container-sm">
          <h1 style={{ marginBottom: '1rem' }}>The StudentCalc Blog</h1>
          <p style={{ margin: '0 auto' }}>Expert, in-depth guides covering study abroad, career, finance, academics and programming.</p>
        </div>
      </section>
      <section style={{ padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            <button onClick={() => filterByCategory(null)} className="tag" style={{ cursor: 'pointer', border: 'none', background: !currentCategory ? 'var(--text-primary)' : undefined, color: !currentCategory ? 'var(--bg)' : undefined }}>All</button>
            {categories.map((cat) => (
              <button key={cat.slug} onClick={() => filterByCategory(cat.slug)} className="tag" style={{ cursor: 'pointer', border: 'none', background: currentCategory === cat.slug ? 'var(--text-primary)' : undefined, color: currentCategory === cat.slug ? 'var(--bg)' : undefined }}>
                {cat.name} ({cat.post_count || 0})
              </button>
            ))}
          </div>
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No posts found.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '1.5rem' }}>
              {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPosts: getBlogPosts({ pageSize: 1000 }).results,
      categories: getBlogCategories(),
    },
  };
}
