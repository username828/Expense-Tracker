// src/components/Expenses.js
import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseSummary from "./ExpenseSummary";

const ExpenseHome = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Expenses</h1>
      <ExpenseFilter />
      <ExpenseSummary />
      <ExpenseList />
    </div>
  );
};

export default ExpenseHome;
