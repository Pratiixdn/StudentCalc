import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPost, getBlogPosts } from '../../lib/data';
import AdSlot from '../../components/ui/AdSlot';

export default function BlogDetail({ post, related }) {
  if (!post) return null;
  return (
    <>
      <Head>
        <title>{post.meta_title || `${post.title} — StudentCalc`}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
      </Head>
      <article style={{ padding: '3rem 0' }}>
        <div className="container-sm">
          <nav style={{ display: 'flex', gap: '.5rem', fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link><span>/</span>
            <Link href="/blog" style={{ color: 'var(--text-muted)' }}>Blog</Link><span>/</span>
            <Link href={`/blog?category=${post.category_slug}`} style={{ color: 'var(--text-muted)' }}>{post.category_name}</Link>
          </nav>
          <span className="tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{post.category_name}</span>
          <h1 style={{ marginBottom: '1.5rem' }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-subtle)' }}>
            {post.author_name && <span>By {post.author_name}</span>}
            {post.published_at && <span>· {format(new Date(post.published_at), 'MMMM d, yyyy')}</span>}
            {post.reading_time && <span>· {post.reading_time} min read</span>}
          </div>
          <div className="article-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
          <div style={{ margin: '2rem 0' }}>
            <AdSlot adSlot="0000000000" style={{ minHeight: 90 }} />
          </div>
          {post.tags?.length > 0 && (
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
              {post.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
            </div>
          )}
        </div>
      </article>
      {related?.length > 0 && (
        <section style={{ padding: '3rem 0', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>More from {post.category_name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.5rem' }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-link" style={{ display: 'block', padding: '1.5rem', textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '.95rem' }}>{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const data = getBlogPosts({ pageSize: 1000 });
  return { paths: data.results.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const post = getBlogPost(params.slug);
    const related = getBlogPosts({ category: post.category_slug, pageSize: 4 }).results.filter((p) => p.slug !== post.slug).slice(0, 3);
    return { props: { post, related } };
  } catch {
    return { notFound: true };
  }
}
