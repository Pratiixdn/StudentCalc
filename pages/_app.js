import Head from 'next/head';
import Script from 'next/script';
import Layout from '../components/layout/Layout';
import CookieConsent from '../components/ui/CookieConsent';
import '../styles/globals.css';

const THEME_SCRIPT = `
(function(){try{var s=localStorage.getItem('sc-theme');var sys=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme', s||sys);}catch(e){}})();
`;

export default function App({ Component, pageProps }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2C2D2D" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </Head>

      {adsenseId && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <CookieConsent />
    </>
  );
}
