import Head from 'next/head';
import { useState } from 'react';
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
      if (data.success) setForm({ name: '', email: '', message: '' });
    } catch { setStatus('error'); }
  };
  return (
    <>
      <Head><title>Contact Us — StudentCalc</title></Head>
      <section style={{padding:'3rem 0'}}><div className="container-sm">
        <h1 style={{marginBottom:'1rem'}}>Contact Us</h1>
        <p style={{marginBottom:'2rem'}}>Questions or feedback — we read every message.</p>
        <form onSubmit={handleSubmit} style={{maxWidth:560}}>
          <div style={{marginBottom:'1.25rem'}}><label className="form-label">Name</label>
            <input className="form-input" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
          <div style={{marginBottom:'1.25rem'}}><label className="form-label">Email</label>
            <input type="email" className="form-input" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
          <div style={{marginBottom:'1.5rem'}}><label className="form-label">Message</label>
            <textarea className="form-input" rows={5} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} /></div>
          <button type="submit" className="btn btn-primary" disabled={status==='loading'}>{status==='loading' ? <span className="spinner"/> : 'Send Message'}</button>
          {status==='success' && <p className="alert alert-success" style={{marginTop:'1rem'}}>Message sent!</p>}
          {status==='error' && <p className="alert alert-error" style={{marginTop:'1rem'}}>Something went wrong.</p>}
        </form>
      </div></section>
    </>
  );
}
