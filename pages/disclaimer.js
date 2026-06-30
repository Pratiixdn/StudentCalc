import Head from 'next/head';
export default function Disclaimer() {
  return (
    <>
      <Head><title>Disclaimer — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'1.5rem'}}>Disclaimer</h1>
        <div className="article-content">
          <p>The calculators and articles on StudentCalc are provided for general informational and educational purposes only. They do not constitute financial, legal, immigration, or academic advice.</p>
          <p>Always consult qualified professionals — financial advisors, registered migration agents, academic counsellors — before making significant decisions based on information found on this site.</p>
          <p>Visa requirements, scholarship details, and financial figures referenced in our articles change frequently. Always verify current information through official government and institutional sources before acting on it.</p>
        </div>
      </div></section>
    </>
  );
}
