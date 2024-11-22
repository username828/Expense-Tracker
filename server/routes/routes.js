const {addExpense,getExpenses,deleteExpense}=require('../controllers/expense');
const {signUp,login, logout } = require('../controllers/auth.controller');
const {getUsers,getUserById}=require('../controllers/user.controller');

const router=require('express').Router();


router.post('/add-expense',addExpense)
    .get('/get-expenses',getExpenses)
    .delete('/delete-expense/:id',deleteExpense)

    .post('/signup',signUp)
    .get('/users',getUsers)
    .get('/users/me',getUserById)
    .post('/login',login)
    .post('/logout',logout)

module.exports=router

