import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudget } from "../../redux/BudgetSlice"; // Import addBudget action
import axios from "axios";

const BudgetForm = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && amount > 0) {
      const newBudget = {
        //_id: Date.now().toString(), // Temporary ID for frontend-only management
        category,
        amount: Number(amount),
      };
      const response = await axios.post(
        `${process.ENV.BASE_URL}/api/add-budget`,
        newBudget,
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(addBudget(newBudget));
      }

      setCategory("");
      setAmount("");
    } else {
      alert("Please provide valid category and amount!");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Add Budget</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-center"
      >
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="max-w-full p-2 border rounded"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="max-w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
