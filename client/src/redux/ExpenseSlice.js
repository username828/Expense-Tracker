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
  groupedExpenses:[]
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
    setGroupedExpenses(state, action) {
      state.groupedExpenses = action.payload;
    },
  },
});

export const { setExpenses, addExpense, deleteExpense, updateExpense, setFilter, clearFilter,setGroupedExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
