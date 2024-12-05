// src/components/Expenses.js
import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseSummary from "./ExpenseSummary";

const ExpenseHome = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">My Expenses</h1>
      <ExpenseFilter/>
      <ExpenseList />
    </div>
  );
};

export default ExpenseHome;
