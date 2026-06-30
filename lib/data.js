/**
 * Local content layer. No external API, no database — everything ships
 * inside the Next.js bundle as static JSON, read at build time.
 * This file replaces what used to be a fetch-based Django API client.
 */
import content from '../data/content.json';

const { posts, blog_categories, calculators, calc_categories, authors, faqs, stats } = content;

// ─── Calculators ──────────────────────────────────────────────

export function getCalculatorCategories() {
  return calc_categories.map((c) => ({
    ...c,
    post_count: calculators.filter((cc) => cc.category_slug === c.slug).length,
  }));
}

export function getCalculators({ category } = {}) {
  let list = calculators;
  if (category) list = list.filter((c) => c.category_slug === category);
  return list;
}

export function getCalculator(slug) {
  const calc = calculators.find((c) => c.slug === slug);
  if (!calc) throw new Error('Calculator not found');
  const contentParts = [];
  if (calc.how_it_works) contentParts.push(`<h2>How It Works</h2><p>${calc.how_it_works}</p>`);
  if (calc.step_by_step) contentParts.push(`<h2>Step by Step</h2><p>${calc.step_by_step}</p>`);
  if (calc.benefits) contentParts.push(`<h2>Benefits</h2><p>${calc.benefits}</p>`);
  if (calc.common_mistakes) contentParts.push(`<h2>Common Mistakes</h2><p>${calc.common_mistakes}</p>`);
  if (calc.examples) contentParts.push(`<h2>Examples</h2><p>${calc.examples}</p>`);
  return { ...calc, content: contentParts.join('') };
}

// ─── Blog ─────────────────────────────────────────────────────

export function getBlogCategories() {
  return blog_categories.map((c) => ({
    ...c,
    post_count: posts.filter((p) => p.category_slug === c.slug).length,
  }));
}

export function getBlogPosts({ page = 1, category = '', search = '', pageSize = 10 } = {}) {
  let list = posts;
  if (category) list = list.filter((p) => p.category_slug === category);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
    );
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    count: list.length,
    page,
    page_size: pageSize,
    has_next: end < list.length,
    results: list.slice(start, end),
  };
}

export function getBlogPost(slug) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error('Post not found');
  return post;
}

export function getAuthors() {
  return authors.map((a) => ({ ...a, post_count: posts.filter((p) => p.author_name === a.name).length }));
}

export function getAuthor(slug) {
  const author = authors.find((a) => a.slug === slug);
  if (!author) throw new Error('Author not found');
  return { ...author, posts: posts.filter((p) => p.author_name === author.name) };
}

// ─── FAQ / Stats ────────────────────────────────────────────────

export function getFAQs(category = '') {
  if (category) return faqs.filter((f) => f.category === category);
  return faqs;
}

export function getSiteStats() {
  return stats;
}

// ─── Home aggregate ──────────────────────────────────────────────

export function getHomeData() {
  return {
    calculators: calculators.filter((c) => c.is_featured).slice(0, 8),
    posts: posts.slice(0, 6),
    stats,
    faqs: faqs.slice(0, 6),
  };
}
