import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  filter: {
    category: 'All',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    search:'',
  },
  budget: 0,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(exp => exp._id !== action.payload);
    },
    updateExpense: (state, action) => {
      const updatedExpense = action.payload;
      const index = state.expenses.findIndex(exp => exp._id === updatedExpense._id);
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
      }
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: (state) => {
      state.filter = initialState.filter;
    },
    setBudget: (state, action) => {
        state.budget = action.payload;
      },
  },
});

export const { setExpenses, addExpense, deleteExpense, updateExpense, setFilter, clearFilter,setBudget } = expenseSlice.actions;
export default expenseSlice.reducer;