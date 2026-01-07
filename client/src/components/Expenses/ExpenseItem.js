// src/components/ExpenseItem.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../../redux/ExpenseSlice";
import axios from "axios";
import UpdateExpense from "./UpdateExpense";
const ExpenseItem = ({ expense }) => {
  const [isUpdate, setUpdate] = useState(false);
  //const [showForm,setShowForm]=useState(true);
  const expenseId = expense._id;

  function showUpdate() {
    setUpdate((prevState) => !prevState);
  }
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.ENV.BASE_URL}/api/delete-expense/${expense._id}`,
        { withCredentials: true }
      );
      dispatch(deleteExpense(expense._id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 mb-4 bg-white shadow-md rounded-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
        <h3 className="font-semibold text-lg text-gray-800">{expense.title}</h3>
        <p className="text-sm text-gray-500">Category: {expense.category}</p>
      </div>
      <div className="w-1/2 text-right sm:w-1/4 mb-2 sm:mb-0">
        <p className="text-lg font-bold text-blue-600">Rs.{expense.amount}</p>
        <p className="text-sm text-gray-400">
          Date: {new Date(expense.date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-2 w-full sm:w-auto sm:justify-end">
        <button
          onClick={showUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {isUpdate && <UpdateExpense expenseId={expenseId} />}
    </div>
  );
};

export default ExpenseItem;
