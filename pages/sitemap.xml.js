import { getCalculators, getBlogPosts } from '../lib/data';

const STATIC_PAGES = ['', '/about', '/contact', '/calculators', '/blog', '/faq', '/privacy-policy', '/terms-and-conditions', '/disclaimer', '/cookie-policy'];

function generateSitemap(siteUrl, calculators, posts) {
  const urls = [
    ...STATIC_PAGES.map((p) => `${siteUrl}${p}`),
    ...calculators.map((c) => `${siteUrl}/calculators/${c.slug}`),
    ...posts.map((p) => `${siteUrl}/blog/${p.slug}`),
  ];
  const body = urls.map((url) => `<url><loc>${url}</loc><changefreq>weekly</changefreq></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export default function Sitemap() { return null; }

export async function getServerSideProps({ res }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studentcalc.com';
  const calculators = getCalculators();
  const posts = getBlogPosts({ pageSize: 1000 }).results;
  const xml = generateSitemap(siteUrl, calculators, posts);
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.write(xml);
  res.end();
  return { props: {} };
}
