import { useState } from 'react';
// Calls the local Next.js API route — no external backend needed.
async function calculate(slug, payload) {
  const res = await fetch(`/api/calculators/${slug}/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Field names match Django calculators/views.py CALC_HANDLERS exactly — verified against test suite.
const FIELD_CONFIGS = {
  gpa: { rows: true, rowFields: [{ name: 'subject', label: 'Subject', type: 'text' }, { name: 'points', label: 'Grade Points', type: 'number', step: '0.1', min: 0, max: 4 }, { name: 'credits', label: 'Credits', type: 'number', step: '0.5', min: 0 }] },
  cgpa: { rows: true, rowFields: [{ name: 'gpa', label: 'Semester GPA', type: 'number', step: '0.01', min: 0, max: 4 }, { name: 'credits', label: 'Credits', type: 'number', step: '1', min: 0 }] },
  grade: { rows: true, rowFields: [{ name: 'score', label: 'Score (%)', type: 'number', step: '0.1', min: 0, max: 100 }, { name: 'weight', label: 'Weight', type: 'number', step: '0.1', min: 0 }] },
  budget: { rows: true, single: [{ name: 'income', label: 'Monthly Income', type: 'number', step: '0.01' }], rowFields: [{ name: 'exp-name', label: 'Expense', type: 'text' }, { name: 'exp-amount', label: 'Amount', type: 'number', step: '0.01' }] },
  percentage: { single: [{ name: 'obtained', label: 'Marks Obtained', type: 'number', step: '0.01' }, { name: 'total', label: 'Total Marks', type: 'number', step: '0.01' }] },
  attendance: { single: [{ name: 'attended', label: 'Classes Attended', type: 'number', step: '1' }, { name: 'total', label: 'Total Classes', type: 'number', step: '1' }] },
  emi: { single: [{ name: 'principal', label: 'Loan Amount', type: 'number', step: '0.01' }, { name: 'rate', label: 'Annual Interest Rate (%)', type: 'number', step: '0.01' }, { name: 'months', label: 'Tenure (months)', type: 'number', step: '1' }] },
  compound_interest: { single: [{ name: 'principal', label: 'Principal', type: 'number', step: '0.01' }, { name: 'rate', label: 'Annual Rate (%)', type: 'number', step: '0.01' }, { name: 'time', label: 'Years', type: 'number', step: '1' }, { name: 'n', label: 'Compounds/Year', type: 'number', step: '1', defaultValue: 12 }] },
  bmi: { single: [{ name: 'weight', label: 'Weight (kg)', type: 'number', step: '0.1' }, { name: 'height', label: 'Height (cm)', type: 'number', step: '0.1' }] },
  age: { single: [{ name: 'dob', label: 'Date of Birth', type: 'date' }] },
  ielts: { single: [{ name: 'listening', label: 'Listening', type: 'number', step: '0.5', min: 0, max: 9 }, { name: 'reading', label: 'Reading', type: 'number', step: '0.5', min: 0, max: 9 }, { name: 'writing', label: 'Writing', type: 'number', step: '0.5', min: 0, max: 9 }, { name: 'speaking', label: 'Speaking', type: 'number', step: '0.5', min: 0, max: 9 }] },
  study_hours: { single: [{ name: 'subjects', label: 'Number of Subjects', type: 'number', step: '1' }, { name: 'hours_per_subject', label: 'Hours per Subject/Day', type: 'number', step: '0.5', defaultValue: 2 }, { name: 'days', label: 'Days', type: 'number', step: '1', defaultValue: 7 }] },
  savings: { single: [{ name: 'monthly', label: 'Monthly Savings', type: 'number', step: '0.01' }, { name: 'rate', label: 'Annual Rate (%)', type: 'number', step: '0.01' }, { name: 'years', label: 'Years', type: 'number', step: '1' }] },
  living_cost: { single: [{ name: 'rent', label: 'Monthly Rent', type: 'number', step: '0.01' }, { name: 'food', label: 'Monthly Food', type: 'number', step: '0.01' }, { name: 'transport', label: 'Monthly Transport', type: 'number', step: '0.01' }, { name: 'utilities', label: 'Utilities', type: 'number', step: '0.01' }, { name: 'misc', label: 'Miscellaneous', type: 'number', step: '0.01' }] },
  storage: { single: [{ name: 'value', label: 'Value', type: 'number', step: '0.01' }, { name: 'from_unit', label: 'From', type: 'select', options: ['B', 'KB', 'MB', 'GB', 'TB'] }, { name: 'to_unit', label: 'To', type: 'select', options: ['B', 'KB', 'MB', 'GB', 'TB'] }] },
};

const RESULT_DISPLAY = {
  gpa: (r) => ({ value: r.gpa, label: 'GPA', sub: r.letter_grade }),
  cgpa: (r) => ({ value: r.cgpa, label: 'CGPA' }),
  percentage: (r) => ({ value: `${r.percentage}%`, label: 'Percentage', sub: r.grade }),
  attendance: (r) => ({ value: `${r.percentage}%`, label: 'Attendance', sub: r.status }),
  emi: (r) => ({ value: `$${fmt(r.emi)}`, label: 'Monthly EMI' }),
  compound_interest: (r) => ({ value: `$${fmt(r.amount)}`, label: 'Final Amount' }),
  bmi: (r) => ({ value: r.bmi, label: 'BMI', sub: r.category }),
  age: (r) => ({ value: `${r.years}`, label: 'Years Old', sub: `${r.months}mo, ${r.days}d` }),
  ielts: (r) => ({ value: r.band, label: 'Overall Band Score' }),
  study_hours: (r) => ({ value: `${r.daily_hours || ''}h`, label: 'Daily Study Hours' }),
  savings: (r) => ({ value: `$${fmt(r.total)}`, label: 'Total Savings' }),
  grade: (r) => ({ value: `${r.grade}%`, label: 'Final Grade', sub: r.letter }),
  budget: (r) => ({ value: `$${fmt(r.remaining)}`, label: 'Remaining Budget' }),
  living_cost: (r) => ({ value: `$${fmt(r.monthly)}`, label: 'Monthly Cost' }),
  storage: (r) => ({ value: r.result, label: r.to }),
};

function fmt(n) {
  if (typeof n !== 'number') return n;
  return n % 1 === 0 ? n.toLocaleString() : n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function CalculatorForm({ slug, type }) {
  const config = FIELD_CONFIGS[type] || { single: [] };
  const [rows, setRows] = useState([{}]);
  const [singleValues, setSingleValues] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateRow = (idx, field, value) => {
    const next = [...rows];
    next[idx] = { ...next[idx], [field]: value };
    setRows(next);
  };
  const addRow = () => setRows([...rows, {}]);
  const removeRow = (idx) => setRows(rows.filter((_, i) => i !== idx));

  const buildPayload = () => {
    if (config.rows) {
      if (type === 'gpa') return { grades: rows.map(r => ({ subject: r.subject || '', points: parseFloat(r.points) || 0, credits: parseFloat(r.credits) || 1 })) };
      if (type === 'cgpa') return { semesters: rows.map(r => ({ gpa: parseFloat(r.gpa) || 0, credits: parseFloat(r.credits) || 0 })) };
      if (type === 'grade') return { grades: rows.map(r => ({ score: parseFloat(r.score) || 0, weight: parseFloat(r.weight) || 1 })) };
      if (type === 'budget') return { income: parseFloat(singleValues.income) || 0, expenses: rows.map(r => ({ name: r['exp-name'] || '', amount: parseFloat(r['exp-amount']) || 0 })) };
    }
    const payload = {};
    (config.single || []).forEach(f => { payload[f.name] = singleValues[f.name] ?? f.defaultValue ?? ''; });
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const data = await calculate(slug, buildPayload());
      if (data.success) setResult(data.result);
      else setError(data.error || 'Calculation failed.');
    } catch {
      setError('Network error. Please try again.');
    } finally { setLoading(false); }
  };

  const display = result && RESULT_DISPLAY[type] ? RESULT_DISPLAY[type](result) : null;

  return (
    <div className="card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
      <form onSubmit={handleSubmit}>
        {config.single?.map((f) => (
          <div key={f.name} style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">{f.label}</label>
            {f.type === 'select' ? (
              <select className="form-input" value={singleValues[f.name] ?? f.options[0]} onChange={e => setSingleValues({ ...singleValues, [f.name]: e.target.value })}>
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input className="form-input" type={f.type} step={f.step} min={f.min} max={f.max} required
                value={singleValues[f.name] ?? f.defaultValue ?? ''} onChange={e => setSingleValues({ ...singleValues, [f.name]: e.target.value })} />
            )}
          </div>
        ))}

        {config.rows && (
          <>
            {rows.map((row, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: `repeat(${config.rowFields.length}, 1fr) auto`, gap: '.75rem', alignItems: 'end', marginBottom: '.75rem' }}>
                {config.rowFields.map((f) => (
                  <input key={f.name} className="form-input" type={f.type} step={f.step} min={f.min} max={f.max} placeholder={f.label} required
                    value={row[f.name] || ''} onChange={(e) => updateRow(idx, f.name, e.target.value)} />
                ))}
                <button type="button" className="btn btn-secondary" style={{ width: 42, height: 42, padding: 0 }} onClick={() => removeRow(idx)}>✕</button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary btn-sm" onClick={addRow} style={{ marginBottom: '1rem' }}>+ Add Row</button>
          </>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '.5rem' }} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Calculate'}
        </button>
      </form>

      {error && <div className="alert alert-error" style={{ marginTop: '1rem' }}>{error}</div>}

      {display && (
        <div className="slide-up" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>{display.value}</div>
          <div style={{ fontSize: '.875rem', color: 'var(--text-muted)', marginTop: '.5rem' }}>{display.label}{display.sub ? ` — ${display.sub}` : ''}</div>
        </div>
      )}
    </div>
  );
}
