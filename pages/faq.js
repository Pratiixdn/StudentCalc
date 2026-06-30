import Head from 'next/head';
import { getFAQs } from '../lib/data';
import FAQAccordion from '../components/ui/FAQAccordion';

export default function FAQPage({ faqs }) {
  return (
    <>
      <Head><title>FAQ — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'2rem'}}>Frequently Asked Questions</h1>
        <FAQAccordion items={faqs} />
      </div></section>
    </>
  );
}

export async function getStaticProps() {
  return { props: { faqs: getFAQs() } };
}
