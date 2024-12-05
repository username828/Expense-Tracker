import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        budgets: [],
    },
    reducers: {
        setBudgets: (state, action) => {
            state.budgets = action.payload;
        },
        addBudget: (state, action) => {
            state.budgets.push(action.payload);
        },
        updateBudget: (state, action) => {
            state.budgets = state.budgets.map(budget => 
                budget._id === action.payload._id ? action.payload : budget
            );
        },
        deleteBudget: (state, action) => {
            state.budgets = state.budgets.filter(budget => budget._id !== action.payload);
        },
    },
});
export const { setBudgets, addBudget, updateBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;

