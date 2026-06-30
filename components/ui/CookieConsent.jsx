import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sc-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('sc-cookie-consent', 'accepted');
    setVisible(false);
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' });
    }
  };

  const decline = () => {
    localStorage.setItem('sc-cookie-consent', 'declined');
    setVisible(false);
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied' });
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300,
        background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)',
        padding: '1.25rem 1.5rem', boxShadow: 'var(--shadow-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '1.5rem', flexWrap: 'wrap',
      }}
    >
      <p style={{ margin: 0, fontSize: '.85rem', color: 'var(--text-secondary)', maxWidth: '60ch' }}>
        We use cookies for analytics and to show relevant ads. See our{' '}
        <a href="/cookie-policy" style={{ textDecoration: 'underline' }}>Cookie Policy</a>.
      </p>
      <div style={{ display: 'flex', gap: '.75rem', flexShrink: 0 }}>
        <button onClick={decline} className="btn btn-secondary btn-sm">Decline</button>
        <button onClick={accept} className="btn btn-primary btn-sm">Accept</button>
      </div>
    </div>
  );
}
