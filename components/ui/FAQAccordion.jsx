import { useState } from 'react';

export default function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '1.25rem 0', cursor: 'pointer', fontWeight: 600, fontSize: '.95rem', color: 'var(--text-primary)', background: 'none', border: 'none', textAlign: 'left', gap: '1rem' }}
            >
              {item.question}
              <span style={{ flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', fontSize: '1.4rem' }}>+</span>
            </button>
            {isOpen && <div className="slide-up" style={{ paddingBottom: '1.25rem', fontSize: '.9rem', color: 'var(--text-muted)', lineHeight: 1.78 }}>{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
