import Link from 'next/link';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card card-link" style={{ display: 'block', padding: '1.5rem', textDecoration: 'none' }}>
      <div style={{ display: 'flex', gap: '.75rem', fontSize: '.76rem', color: 'var(--text-muted)', marginBottom: '.75rem', flexWrap: 'wrap' }}>
        <span className="tag">{post.category_name}</span>
        {post.published_at && <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>}
        {post.reading_time && <span>· {post.reading_time} min</span>}
      </div>
      <h3 style={{ fontSize: '1.02rem', marginBottom: '.75rem', lineHeight: 1.42 }}>{post.title}</h3>
      <p style={{ fontSize: '.875rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: 'none' }}>
        {post.excerpt}
      </p>
    </Link>
  );
}
