import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpense } from '../../redux/ExpenseSlice';
import axios from 'axios';

const UpdateExpense = (props) => {
//   function closeForm(){
//     props.onClose();
//   }
  const dispatch = useDispatch();
  //id passed as props otherwise expense used before initialization
  const expense = useSelector(state =>
    state.expense.expenses.find(exp => exp._id === props.expenseId)
  );
  
  const [formData, setFormData] = useState(expense || {});

  useEffect(() => {
    if (expense){
        setFormData(expense)
    };
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/update-expense/${expense._id}`, formData, { withCredentials: true });
      if (response.status === 200) {
        dispatch(updateExpense(response.data)); // Update Redux store
      }
      props.onClose();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  if (!expense) return <div>Loading...</div>;

  return (
    // <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Expense
          </button>
          {/* <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button> */}
        </div>
      </form>
    </div>
    //</div>
  );
};

export default UpdateExpense;
