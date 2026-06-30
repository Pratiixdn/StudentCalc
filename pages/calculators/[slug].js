import Head from 'next/head';
import Link from 'next/link';
import { getCalculator, getCalculators } from '../../lib/data';
import CalculatorForm from '../../components/calculators/CalculatorForm';
import FAQAccordion from '../../components/ui/FAQAccordion';

export default function CalculatorDetail({ calculator }) {
  if (!calculator) return null;
  return (
    <>
      <Head>
        <title>{calculator.meta_title || `${calculator.name} — Free Online Calculator | StudentCalc`}</title>
        <meta name="description" content={calculator.meta_description || calculator.description} />
      </Head>
      <section style={{ padding: '3rem 0' }}>
        <div className="container-sm">
          <nav style={{ display: 'flex', gap: '.5rem', fontSize: '.78rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link><span>/</span>
            <Link href="/calculators" style={{ color: 'var(--text-muted)' }}>Calculators</Link><span>/</span>
            <span>{calculator.name}</span>
          </nav>
          <h1 style={{ marginBottom: '1rem' }}>{calculator.name}</h1>
          <p style={{ marginBottom: '2.5rem' }}>{calculator.description}</p>
          <CalculatorForm slug={calculator.slug} type={calculator.calculator_type} />
          {calculator.faqs?.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
              <FAQAccordion items={calculator.faqs} />
            </div>
          )}
          {calculator.content && (
            <div className="article-content" style={{ marginTop: '3rem' }} dangerouslySetInnerHTML={{ __html: calculator.content }} />
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const calculators = getCalculators();
  return { paths: calculators.map((c) => ({ params: { slug: c.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    return { props: { calculator: getCalculator(params.slug) } };
  } catch {
    return { notFound: true };
  }
}
