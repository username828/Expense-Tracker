import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './ExpenseSlice';
import budgetReducer from './BudgetSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    budget: budgetReducer,
  },
});

export default store;
