const {addExpense,getExpenses,deleteExpense, updateExpense, getExpensesByCategory}=require('../controllers/expense.controller');
const {signUp,login, logout, changePassword } = require('../controllers/auth.controller');
const {getUsers,getUserById}=require('../controllers/user.controller');
const { addBudget, updateBudget, getBudget, deleteBudget } = require('../controllers/budget.controller');

const router=require('express').Router();


router.post('/add-expense',addExpense)
    .get('/get-expenses',getExpenses)
    .get('/get-expense-by-category',getExpensesByCategory)
    .delete('/delete-expense/:id',deleteExpense)
    .put('/update-expense/:id',updateExpense)

    .post('/add-budget',addBudget)
    .get('/get-budgets',getBudget)
    .put('/update-budget/:id',updateBudget)
    .delete('/delete-budget/:id',deleteBudget)

    .post('/signup',signUp)
    .get('/users',getUsers)
    .get('/users/me',getUserById)
    .post('/login',login)
    .post('/logout',logout)
    .post('/change-password',changePassword)

module.exports=router

