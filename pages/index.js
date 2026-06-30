import Head from 'next/head';
import Link from 'next/link';
import { getCalculators, getBlogPosts, getSiteStats, getFAQs } from '../lib/data';
import CalculatorCard from '../components/calculators/CalculatorCard';
import PostCard from '../components/blog/PostCard';
import FAQAccordion from '../components/ui/FAQAccordion';
import NewsletterForm from '../components/ui/NewsletterForm';

export default function Home({ calculators, posts, stats, faqs }) {
  return (
    <>
      <Head>
        <title>StudentCalc — Free Calculators & Resources for Students</title>
        <meta name="description" content="Free GPA, CGPA, EMI, IELTS, BMI and 15+ academic calculators, plus expert study guides for students worldwide." />
      </Head>

      <section style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container-sm">
          <span className="tag" style={{ marginBottom: '2rem', display: 'inline-block' }}>FREE FOREVER · NO SIGN-UP</span>
          <h1 style={{ marginBottom: '1.5rem' }}>Calculators and guides built for student life</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '52ch', margin: '0 auto 2.5rem' }}>
            GPA, CGPA, EMI, IELTS band score, BMI and more — instant, accurate, and free.
            Plus 40+ in-depth guides on study abroad, careers, finance, and programming.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/calculators" className="btn btn-primary btn-lg">Browse Calculators</Link>
            <Link href="/blog" className="btn btn-secondary btn-lg">Read the Blog</Link>
          </div>
        </div>
      </section>

      {stats?.length > 0 && (
        <section style={{ padding: '0 0 3rem' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
              {stats.map((s) => (
                <div key={s.label} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                  <div style={{ fontSize: '2.4rem', fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Popular Calculators</h2>
            <p style={{ margin: '0 auto', color: 'var(--text-muted)' }}>Instant, accurate results for the calculations students need most.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.25rem' }}>
            {calculators.slice(0, 8).map((calc) => <CalculatorCard key={calc.slug} calculator={calc} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/calculators" className="btn btn-secondary">View All Calculators →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>From the Blog</h2>
            <p style={{ margin: '0 auto', color: 'var(--text-muted)' }}>In-depth, expert-written guides on study abroad, career, finance and programming.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '1.5rem' }}>
            {posts.slice(0, 6).map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/blog" className="btn btn-secondary">Read More Articles →</Link>
          </div>
        </div>
      </section>

      {faqs?.length > 0 && (
        <section style={{ padding: '4rem 0' }}>
          <div className="container-sm">
            <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </section>
      )}

      <section style={{ padding: '3rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-sm" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '.75rem' }}>Get new guides in your inbox</h2>
          <p style={{ margin: '0 auto 1.5rem' }}>One email a month. No spam, ever.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      calculators: getCalculators(),
      posts: getBlogPosts({ page: 1 }).results,
      stats: getSiteStats(),
      faqs: getFAQs(),
    },
  };
}
