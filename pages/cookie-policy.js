import Head from 'next/head';
export default function CookiePolicy() {
  return (
    <>
      <Head><title>Cookie Policy — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'1.5rem'}}>Cookie Policy</h1>
        <div className="article-content">
          <p>StudentCalc uses cookies for three purposes: remembering your theme preference, anonymous analytics, and ad personalization through Google AdSense.</p>
          <h2>Essential</h2>
          <p>Theme preference (dark/light) and your cookie consent choice itself. These are required for the site to function as intended and cannot be disabled.</p>
          <h2>Analytics</h2>
          <p>Google Analytics cookies help us understand which pages and calculators are most useful, so we can improve them.</p>
          <h2>Advertising</h2>
          <p>Google AdSense cookies allow ads shown on this site to be relevant to you. You can opt out of personalized ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
          <h2>Managing Cookies</h2>
          <p>Use the cookie banner on your first visit, or your browser's cookie settings at any time, to control non-essential cookies.</p>
        </div>
      </div></section>
    </>
  );
}
