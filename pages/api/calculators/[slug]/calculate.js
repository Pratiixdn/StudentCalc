import { CALC_HANDLERS } from '../../../../lib/calculators';
import content from '../../../../data/content.json';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { slug } = req.query;
  const calc = content.calculators.find((c) => c.slug === slug);

  if (!calc) {
    return res.status(404).json({ success: false, error: 'Calculator not found.' });
  }

  const fn = CALC_HANDLERS[calc.calculator_type];
  if (!fn) {
    return res.status(400).json({ success: false, error: `No handler for calculator type: ${calc.calculator_type}` });
  }

  try {
    const result = fn(req.body || {});
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message || 'Invalid input provided.' });
  }
}
