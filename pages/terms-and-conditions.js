import Head from 'next/head';
export default function Terms() {
  return (
    <>
      <Head><title>Terms and Conditions — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'1.5rem'}}>Terms and Conditions</h1>
        <div className="article-content">
          <p>StudentCalc provides free calculators and content for informational purposes only. Results are estimates, not professional advice. Verify important calculations independently.</p>
        </div>
      </div></section>
    </>
  );
}
