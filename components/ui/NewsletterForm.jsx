import { useState } from 'react';

async function subscribeNewsletter({ email, name }) {
  const res = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name }),
  });
  return res.json();
}

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const data = await subscribeNewsletter({ email });
      setStatus('success');
      setMessage(data.message || 'Subscribed!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '.75rem' }}>
        <input type="email" required className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? <span className="spinner" /> : 'Subscribe'}
        </button>
      </form>
      {message && <p className={`alert alert-${status === 'success' ? 'success' : 'error'}`} style={{ marginTop: '.75rem', fontSize: '.85rem' }}>{message}</p>}
    </div>
  );
}
