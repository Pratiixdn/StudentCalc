import Head from 'next/head';
export default function PrivacyPolicy() {
  return (
    <>
      <Head><title>Privacy Policy — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'1.5rem'}}>Privacy Policy</h1>
        <div className="article-content">
          <p>Last updated: 2026. This policy explains what data StudentCalc collects and how it is used.</p>

          <h2>Information We Collect</h2>
          <p>We collect minimal data: email address if you subscribe to our newsletter or contact us, and standard, anonymized analytics (pages visited, approximate location, device/browser type) via Google Analytics.</p>

          <h2>Cookies and Advertising</h2>
          <p>StudentCalc uses Google AdSense to display ads. Google and its partners use cookies to serve ads based on your prior visits to this site or other sites on the internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, or generally at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</p>
          <p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</p>

          <h2>Your Choices</h2>
          <p>On your first visit you can accept or decline non-essential cookies via our cookie banner. You can change this choice anytime by clearing your browser's local storage for this site, or by adjusting your browser's cookie settings directly.</p>

          <h2>Third-Party Services</h2>
          <p>We use Google Analytics and Google AdSense, each governed by Google's own privacy policy. Neither service is used by us to identify you personally.</p>

          <h2>Data We Never Collect</h2>
          <p>We do not collect government ID numbers, financial account details, or any sensitive personal data through this site.</p>

          <h2>Contact</h2>
          <p>Questions about this policy can be sent via our <a href="/contact">Contact page</a>.</p>
        </div>
      </div></section>
    </>
  );
}
