import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './ExpenseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
  },
});

export default store;
