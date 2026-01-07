import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBudget } from "../../redux/BudgetSlice";
import axios from "axios";

const EditBudgetForm = ({ budget, onClose }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(budget.category);
  const [amount, setAmount] = useState(budget.amount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category && amount > 0) {
      try {
        const response = await axios.put(
          `${process.ENV.BASE_URL}/api/update-budget/${budget._id}`,
          { category, amount: Number(amount) },
          { withCredentials: true }
        );

        if (response.status === 200) {
          dispatch(updateBudget(response.data.budget));
          onClose();
        }
      } catch (error) {
        console.error("Error updating budget:", error);
        alert("Failed to update budget");
      }
    } else {
      alert("Please provide valid category and amount!");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Edit Budget</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBudgetForm;
