import Link from 'next/link';

export default function CalculatorCard({ calculator }) {
  return (
    <Link href={`/calculators/${calculator.slug}`} className="card card-link" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', textDecoration: 'none' }}>
      <div style={{ width: 48, height: 48, background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.25rem' }}>
        {calculator.icon || '🧮'}
      </div>
      <h3 style={{ fontSize: '1rem', marginBottom: '.5rem' }}>{calculator.name}</h3>
      <p style={{ fontSize: '.84rem', color: 'var(--text-muted)', flex: 1, maxWidth: 'none' }}>{calculator.description}</p>
    </Link>
  );
}
