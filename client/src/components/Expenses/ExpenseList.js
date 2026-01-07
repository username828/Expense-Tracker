// src/components/ExpenseList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../redux/ExpenseSlice";
import ExpenseItem from "./ExpenseItem";
import AddExpense from "./AddExpense";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses, filter } = useSelector((state) => state.expense);

  const [addExpense, setAddExpense] = useState(false);
  function displayForm() {
    setAddExpense((prevState) => !prevState); // Toggle the state
  }
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(`${process.ENV.BASE_URL}/api/get-expenses`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      dispatch(setExpenses(data));
    };
    fetchExpenses();
  }, [dispatch]);

  const filteredExpenses = expenses
    .filter((expense) => {
      const { category, startDate, endDate, search } = filter;
      const withinCategory =
        category === "All" || expense.category === category;
      const withinDateRange =
        (!startDate || new Date(expense.date) >= new Date(startDate)) &&
        (!endDate || new Date(expense.date) <= new Date(endDate));
      const matchesSearch =
        !search || expense.title.toLowerCase().includes(search.toLowerCase()); // Adjust the field 'name' to match the one you're searching
      return withinCategory && withinDateRange && matchesSearch;
    })
    .sort((a, b) => {
      if (filter.sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return b.amount - a.amount;
    });

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl text-center font-bold mb-4 justify-center">
        Expenses
      </h2>
      <div className="flex justify-center my-4">
        <button
          onClick={displayForm}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        >
          Add Expense
        </button>
      </div>

      {addExpense && <AddExpense />}

      {filteredExpenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
