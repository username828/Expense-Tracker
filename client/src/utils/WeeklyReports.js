const getWeeklyExpenses = (expenses) => {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
  
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date); // Assuming `expense.date` is a valid date string
      return expenseDate >= oneWeekAgo && expenseDate <= new Date();
    });
  };
  