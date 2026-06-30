import Head from 'next/head';
import { getCalculators, getCalculatorCategories } from '../../lib/data';
import CalculatorCard from '../../components/calculators/CalculatorCard';

export default function CalculatorsList({ calculators, categories }) {
  const byCategory = categories.map((cat) => ({ ...cat, items: calculators.filter((c) => c.category_slug === cat.slug) }));
  return (
    <>
      <Head><title>Free Student Calculators — StudentCalc</title></Head>
      <section style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div className="container-sm">
          <h1 style={{ marginBottom: '1rem' }}>Free Calculators for Students</h1>
          <p style={{ margin: '0 auto' }}>Instant, accurate results — no sign-up required.</p>
        </div>
      </section>
      {byCategory.map((cat) => cat.items.length > 0 && (
        <section key={cat.slug} style={{ padding: '1.5rem 0' }}>
          <div className="container">
            <h2 style={{ marginBottom: '1.5rem' }}>{cat.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.25rem' }}>
              {cat.items.map((calc) => <CalculatorCard key={calc.slug} calculator={calc} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export async function getStaticProps() {
  return { props: { calculators: getCalculators(), categories: getCalculatorCategories() } };
}
