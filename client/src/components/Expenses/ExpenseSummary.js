import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setGroupedExpenses } from "../../redux/ExpenseSlice";
import axios from "axios";

const ExpenseSummary = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const budgets = useSelector((state) => state.budget.budgets);
  const groupedExpenses = useSelector((state) => state.expense.groupedExpenses);

  const totalExpense =
    expenses && expenses.length
      ? expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)
      : 0;

  useEffect(() => {
    const fetchExpensesByCategory = async () => {
      try {
        const response = await axios.get(
          `${process.ENV.BASE_URL}/api/get-expense-by-category`,
          { withCredentials: true }
        );
        dispatch(setGroupedExpenses(response.data));
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpensesByCategory();
  }, []);

  useEffect(() => {
    if (groupedExpenses && groupedExpenses.length > 0) {
      budgets.forEach((budget) => {
        const expenseData = groupedExpenses.find(
          (item) => item.category === budget.category
        );
        const categoryExpense = expenseData ? expenseData.amount : 0;

        if (categoryExpense > budget.amount) {
          toast.error(
            `Overbudget! Expenses in ${budget.category} exceed the limit of Rs.${budget.amount}`
          );
        }
      });
    }
  }, []);

  const expenseMap = groupedExpenses.reduce((acc, item) => {
    acc[item.category] = item.amount;
    return acc;
  }, {});

  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4 mb-4">
      <h2 className="text-2xl text-center font-bold mb-4">Expense Summary</h2>
      <div className="mt-4 mb-4">
        <p className="text-xl text-center font-semibold">
          Total Expenses: Rs.{totalExpense}
        </p>
      </div>
      <div>
        {budgets.length > 0 ? (
          <div className="space-y-4">
            {budgets.map((budget, index) => {
              const categoryExpense = expenseMap[budget.category] || 0;
              const progress = (categoryExpense / budget.amount) * 100;

              return (
                <div key={`${budget.category}-${index}`} className="mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{budget.category}</span>
                    <span className="text-sm">
                      Rs.{categoryExpense} / Rs.{budget.amount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className={`h-2.5 rounded-full ${
                        progress > 100 ? "bg-red-600" : "bg-blue-600"
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No budgets available.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
