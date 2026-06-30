/**
 * Calculator logic — ported 1:1 from the original Django implementation
 * (calculators/views.py CALC_HANDLERS). Formulas are identical;
 * only language and rounding-call syntax changed.
 */

function round(n, d = 2) {
  const f = 10 ** d;
  return Math.round((n + Number.EPSILON) * f) / f;
}

function getLetterGrade(gpa) {
  if (gpa >= 3.7) return 'A+';
  if (gpa >= 3.3) return 'A';
  if (gpa >= 3.0) return 'A-';
  if (gpa >= 2.7) return 'B+';
  if (gpa >= 2.3) return 'B';
  if (gpa >= 2.0) return 'B-';
  if (gpa >= 1.7) return 'C+';
  if (gpa >= 1.3) return 'C';
  if (gpa >= 1.0) return 'C-';
  return 'F';
}

function getLetterGrade100(score) {
  if (score >= 90) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'B-';
  if (score >= 60) return 'C+';
  if (score >= 55) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

function getGradeFromPercentage(pct) {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 60) return 'C';
  if (pct >= 50) return 'D';
  return 'F';
}

function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

function calcGpa(data) {
  const grades = data.grades || [];
  if (!grades.length) throw new Error('No grades provided');
  const totalPoints = grades.reduce((s, g) => s + parseFloat(g.points) * parseFloat(g.credits), 0);
  const totalCredits = grades.reduce((s, g) => s + parseFloat(g.credits), 0);
  if (totalCredits === 0) throw new Error('Total credits cannot be zero');
  const gpa = totalPoints / totalCredits;
  return {
    gpa: round(gpa, 2),
    total_credits: totalCredits,
    total_points: round(totalPoints, 2),
    letter_grade: getLetterGrade(gpa),
  };
}

function calcCgpa(data) {
  const semesters = data.semesters || [];
  if (!semesters.length) throw new Error('No semesters provided');
  const totalPoints = semesters.reduce((s, sem) => s + parseFloat(sem.gpa) * parseFloat(sem.credits), 0);
  const totalCredits = semesters.reduce((s, sem) => s + parseFloat(sem.credits), 0);
  if (totalCredits === 0) throw new Error('Total credits cannot be zero');
  return { cgpa: round(totalPoints / totalCredits, 2), total_credits: totalCredits };
}

function calcPercentage(data) {
  const obtained = parseFloat(data.obtained || 0);
  const total = parseFloat(data.total || 0);
  if (total === 0) throw new Error('Total marks cannot be zero');
  const pct = (obtained / total) * 100;
  return { percentage: round(pct, 2), grade: getGradeFromPercentage(pct) };
}

function calcAttendance(data) {
  const attended = parseFloat(data.attended || 0);
  const total = parseFloat(data.total || 0);
  if (total === 0) throw new Error('Total classes cannot be zero');
  const pct = (attended / total) * 100;
  const required = parseFloat(data.required || 75);
  let needed = 0;
  if (pct < required) {
    needed = Math.max(0, (required * total - 100 * attended) / (100 - required));
  }
  return {
    percentage: round(pct, 2),
    status: pct >= required ? 'eligible' : 'not eligible',
    classes_needed: Math.trunc(needed) + (needed % 1 ? 1 : 0),
  };
}

function calcEmi(data) {
  const principal = parseFloat(data.principal || 0);
  const annualRate = parseFloat(data.rate || 0);
  const months = parseInt(data.months || 0, 10);
  if (months === 0) throw new Error('Loan tenure cannot be zero');
  const monthlyRate = annualRate / (12 * 100);
  let emi;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    emi = (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  }
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return {
    emi: round(emi, 2),
    total_payment: round(totalPayment, 2),
    total_interest: round(totalInterest, 2),
    principal,
  };
}

function calcCompoundInterest(data) {
  const principal = parseFloat(data.principal || 0);
  const rate = parseFloat(data.rate || 0);
  const time = parseFloat(data.time || 0);
  const n = parseInt(data.n || 12, 10);
  const amount = principal * (1 + rate / (n * 100)) ** (n * time);
  return { amount: round(amount, 2), interest: round(amount - principal, 2), principal };
}

function calcBmi(data) {
  const weight = parseFloat(data.weight || 0);
  const height = parseFloat(data.height || 0);
  const unit = data.unit || 'metric';
  if (height === 0) throw new Error('Height cannot be zero');
  const bmi = unit === 'imperial' ? (weight / height ** 2) * 703 : weight / (height / 100) ** 2;
  return { bmi: round(bmi, 1), category: getBmiCategory(bmi) };
}

function calcAge(data) {
  const dobStr = data.dob || '';
  const dob = new Date(dobStr);
  if (Number.isNaN(dob.getTime())) throw new Error('Invalid date format');
  const today = new Date();

  let years = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) years -= 1;

  let months = (today.getMonth() - dob.getMonth() + 12) % 12;

  const refYear = today.getMonth() + 1 > dob.getMonth() + 1 ? today.getFullYear() : today.getFullYear() - 1;
  const refDate = new Date(refYear, dob.getMonth(), dob.getDate());
  const diffDays = Math.floor((today - refDate) / (1000 * 60 * 60 * 24));

  return { years, months, days: ((diffDays % 30) + 30) % 30 };
}

function calcIelts(data) {
  const scores = ['listening', 'reading', 'writing', 'speaking'].map((s) => parseFloat(data[s] || 0));
  const avg = scores.reduce((a, b) => a + b, 0) / 4;
  const band = Math.round(avg * 2) / 2;
  return { band, average: round(avg, 2) };
}

function calcStudyHours(data) {
  const subjects = parseInt(data.subjects || 0, 10);
  const hoursPerSubject = parseFloat(data.hours_per_subject || 2);
  const days = parseInt(data.days || 7, 10);
  const daily = subjects * hoursPerSubject;
  const weekly = daily * days;
  const breaks = weekly * 0.15;
  return {
    daily_hours: round(daily, 1),
    weekly_hours: round(weekly, 1),
    recommended_breaks: round(breaks, 1),
    effective_study: round(weekly - breaks, 1),
  };
}

function calcSavings(data) {
  const monthly = parseFloat(data.monthly || 0);
  const rate = parseFloat(data.rate || 0);
  const years = parseFloat(data.years || 0);
  const monthsTotal = years * 12;
  const monthlyRate = rate / (12 * 100);
  let total;
  if (monthlyRate === 0) {
    total = monthly * monthsTotal;
  } else {
    total = (monthly * ((1 + monthlyRate) ** monthsTotal - 1)) / monthlyRate;
  }
  const invested = monthly * monthsTotal;
  return { total: round(total, 2), invested: round(invested, 2), interest_earned: round(total - invested, 2) };
}

function calcGrade(data) {
  const grades = data.grades || [];
  if (!grades.length) throw new Error('No grades provided');
  const totalWeight = grades.reduce((s, g) => s + parseFloat(g.weight ?? 1), 0);
  if (totalWeight === 0) throw new Error('Total weight cannot be zero');
  const weightedSum = grades.reduce((s, g) => s + parseFloat(g.score) * parseFloat(g.weight ?? 1), 0);
  const final = weightedSum / totalWeight;
  return { grade: round(final, 2), letter: getLetterGrade100(final) };
}

function calcBudget(data) {
  const income = parseFloat(data.income || 0);
  const expenses = data.expenses || [];
  const totalExp = expenses.reduce((s, e) => s + parseFloat(e.amount), 0);
  const remaining = income - totalExp;
  return {
    total_expenses: round(totalExp, 2),
    remaining: round(remaining, 2),
    expense_ratio: round(income ? (totalExp / income) * 100 : 0, 1),
  };
}

function calcLivingCost(data) {
  const rent = parseFloat(data.rent || 0);
  const food = parseFloat(data.food || 0);
  const transport = parseFloat(data.transport || 0);
  const utilities = parseFloat(data.utilities || 0);
  const misc = parseFloat(data.misc || 0);
  const monthly = rent + food + transport + utilities + misc;
  return { monthly: round(monthly, 2), annual: round(monthly * 12, 2) };
}

function calcStorage(data) {
  const value = parseFloat(data.value || 0);
  const fromUnit = data.from_unit || 'GB';
  const toUnit = data.to_unit || 'MB';
  const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };
  const result = (value * (units[fromUnit] || 1)) / (units[toUnit] || 1);
  return { result: round(result, 4), from: `${value} ${fromUnit}`, to: `${result.toFixed(4)} ${toUnit}` };
}

export const CALC_HANDLERS = {
  gpa: calcGpa,
  cgpa: calcCgpa,
  percentage: calcPercentage,
  attendance: calcAttendance,
  emi: calcEmi,
  compound_interest: calcCompoundInterest,
  bmi: calcBmi,
  age: calcAge,
  ielts: calcIelts,
  study_hours: calcStudyHours,
  savings: calcSavings,
  grade: calcGrade,
  budget: calcBudget,
  living_cost: calcLivingCost,
  storage: calcStorage,
};
