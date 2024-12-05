import { toast } from 'react-toastify';

// Threshold-Based Alerts
export const budgetAlert = (category, spending, budget) => {
  if (spending >= budget * 0.8 && spending < budget) {
    toast.warn(`Warning: You are at 80% of your ${category} budget.`);
  } else if (spending >= budget) {
    toast.error(`Alert: You have exceeded your ${category} budget!`);
  }
};

// Spending Pattern Detection
export const detectUnusualSpending = (expenses) => {
  const averageSpending = expenses.reduce((acc, expense) => acc + expense.amount, 0) / expenses.length;
  const recentSpending = expenses.slice(-7); 

  recentSpending.forEach(expense => {
    if (expense.amount > averageSpending * 2) {
      toast.warn(`Unusual spending detected: Rs.${expense.amount} in category ${expense.category}`);
    }
  });
};
