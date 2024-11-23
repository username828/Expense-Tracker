// src/components/ExpenseSummary.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const ExpenseSummary = () => {
  const { expenses } = useSelector((state) => state.expense);
  const budget=useSelector((state)=>state.expense.budget)
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  useEffect(() => {
    if (totalExpense > budget) {
      toast.error('Warning: You have exceeded your budget!');
    }
  }, [totalExpense, budget]);
  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4">
      <h2 className="text-lg font-bold mb-4">Expense Overview</h2>
      <h3>Total Expenses: ${totalExpense}</h3>
      <h3>Budget: ${budget}</h3>
      {totalExpense > budget && (
        <p className="text-red-500 font-semibold mt-2">
          Warning: You have exceeded your budget!
        </p>
      )}
      <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
        <div
          className={`h-4 rounded-full ${
            totalExpense > budget ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${Math.min((totalExpense / budget) * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
