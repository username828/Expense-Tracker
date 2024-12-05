import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "../../redux/ExpenseSlice";

const ExpenseFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.expense);

  const handleChange = (e) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
<div className="flex flex-wrap gap-4 items-start mb-6 p-6 bg-white rounded-lg shadow-md">
  {/* Category Filter */}
  <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
    <label className="mb-2 text-sm font-medium text-gray-700">Category</label>
    <select
      name="category"
      value={filter.category}
      onChange={handleChange}
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="All">All</option>
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Bills">Bills</option>
    </select>
  </div>

  {/* Start Date Filter */}
  <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
    <label className="mb-2 text-sm font-medium text-gray-700">Start Date</label>
    <input
      type="date"
      name="startDate"
      value={filter.startDate}
      onChange={handleChange}
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* End Date Filter */}
  <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
    <label className="mb-2 text-sm font-medium text-gray-700">End Date</label>
    <input
      type="date"
      name="endDate"
      value={filter.endDate}
      onChange={handleChange}
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Sort By Filter */}
  <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
    <label className="mb-2 text-sm font-medium text-gray-700">Sort By</label>
    <select
      name="sortBy"
      value={filter.sortBy}
      onChange={handleChange}
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>

  {/* Search Filter */}
  <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
    <label className="mb-2 text-sm font-medium text-gray-700">Search</label>
    <input
      type="text"
      name="search"
      value={filter.search}
      onChange={handleChange}
      placeholder="Search expenses..."
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Clear Filter Button */}
  <div className="flex flex-col w-full sm:w-1/2 lg:w-1/4">
    <button
      onClick={handleClearFilter}
      className="w-full bg-red-500 text-white px-4 py-6 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Clear Filter
    </button>
  </div>
</div>

  );
};

export default ExpenseFilter;
