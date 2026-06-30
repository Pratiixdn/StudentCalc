import Head from 'next/head';
export default function About() {
  return (
    <>
      <Head><title>About Us — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'1.5rem'}}>About StudentCalc</h1>
        <div className="article-content">
          <p>StudentCalc provides free, accurate academic calculators and in-depth guides for students worldwide — covering study abroad, career development, personal finance, and academic skills.</p>
          <p>Every calculator matches real formulas used by universities and financial institutions. Every guide is researched for accuracy and updated as policies change.</p>
        </div>
      </div></section>
    </>
  );
}
