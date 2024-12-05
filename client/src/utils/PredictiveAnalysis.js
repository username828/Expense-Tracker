// Moving Average
export const getMovingAverage = (expenses, months = 3) => {
    const recentExpenses = expenses.slice(-months);
    const total = recentExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    return total / months;
  };
  
  // Linear Regression
  export const getLinearRegressionPrediction = (expenses) => {
    const n = expenses.length;
    const x = expenses.map((_, index) => index); 
    const y = expenses.map(expense => expense.amount);
  
    const xMean = x.reduce((acc, val) => acc + val, 0) / n;
    const yMean = y.reduce((acc, val) => acc + val, 0) / n;
  
    let numerator = 0, denominator = 0;
    for (let i = 0; i < n; i++) {
      numerator += (x[i] - xMean) * (y[i] - yMean);
      denominator += (x[i] - xMean) ** 2;
    }
  
    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;
    const nextMonthPrediction = slope * (n) + intercept;
    return nextMonthPrediction;
  };
  