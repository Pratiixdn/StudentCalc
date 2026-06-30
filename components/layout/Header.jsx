import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/calculators', label: 'Calculators' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('sc-theme');
    const sys = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const t = saved || sys;
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [router.pathname]);

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setMobileOpen(false); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sc-theme', next);
  }, [theme]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>SC</span>
            <span>StudentCalc</span>
          </Link>

          <nav className={styles.nav}>
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} className={`${styles.navLink} ${router.pathname === href ? styles.active : ''}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search">🔍</button>
            <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☀️' : '🌙'}</button>
            <button className={`${styles.iconBtn} ${styles.menuBtn}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        {NAV.map(({ href, label }) => <Link key={href} href={href} className={styles.mobileLink}>{label}</Link>)}
      </div>

      {searchOpen && (
        <div className={styles.searchOverlay} onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
          <div className={styles.searchBox}>
            <form onSubmit={handleSearch}>
              <input className="form-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guides…" autoFocus />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
