import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>SC</span><span>StudentCalc</span>
            </Link>
            <p>Free educational calculators, academic tools, and resources for students worldwide.</p>
          </div>
          <div>
            <p className={styles.colTitle}>Calculators</p>
            <ul className={styles.links}>
              <li><Link href="/calculators/gpa-calculator">GPA Calculator</Link></li>
              <li><Link href="/calculators/emi-calculator">EMI Calculator</Link></li>
              <li><Link href="/calculators/ielts-band-calculator">IELTS Calculator</Link></li>
              <li><Link href="/calculators">All Calculators</Link></li>
            </ul>
          </div>
          <div>
            <p className={styles.colTitle}>Resources</p>
            <ul className={styles.links}>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className={styles.colTitle}>Company</p>
            <ul className={styles.links}>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy-policy">Privacy</Link></li>
              <li><Link href="/terms-and-conditions">Terms</Link></li>
              <li><Link href="/cookie-policy">Cookie Policy</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {year} StudentCalc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
