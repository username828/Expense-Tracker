// components/BudgetManager.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from '../../redux/ExpenseSlice';

const BudgetManager = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state) => state.expense.budget);
  const [budgetInput, setBudgetInput] = useState(budget || 0);

  const handleSetBudget = (e) => {
    e.preventDefault();
    dispatch(setBudget(Number(budgetInput)));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Budget Management</h2>
      <form onSubmit={handleSetBudget} className="flex gap-4 items-center">
        <input
          type="number"
          value={budgetInput}
          onChange={(e) => setBudgetInput(e.target.value)}
          placeholder="Enter budget"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Set Budget
        </button>
      </form>
      <h3 className="mt-4 text-gray-700">Current Budget: ${budget}</h3>
    </div>
  );
};

export default BudgetManager;
