const BudgetSchema=require('../models/budget.model')
const jwt = require("jsonwebtoken");

exports.addBudget = async(req,res)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized access"})
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }


    console.log('Request Body:', req.body);

    const {category,amount}=req.body

    if(!category || !amount){
        return res.status(400).json({message:"All fields required"})
    }

    if(isNaN(amount) || amount <=0){
        return res.status(400).json({message:"Amount must be a positive number"})
    }

    const budget=new BudgetSchema({
        category,
        amount,
        recorded_by:decoded.id
    })

    console.log(budget)

    try{
        await budget.save();
        return res.status(201).json({message:"Budget added"})
    }catch (error){
        res.status(500).json({ message: "Server Error" });
    }
}

exports.updateBudget = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token", error: err.message });
    }

    const { id } = req.params; // The budget ID to update
    const { category, amount } = req.body;

    if (!category && !amount) {
        return res.status(400).json({ message: "At least one field (category or amount) must be provided" });
    }

    if (amount && (isNaN(amount) || amount <= 0)) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }

    try {
        const budget = await BudgetSchema.findOne({ _id: id, recorded_by: decoded.id });
        if (!budget) {
            return res.status(404).json({ message: "Budget not found or not authorized to edit" });
        }

        if (category) budget.category = category;
        if (amount) budget.amount = amount;

        await budget.save();
        return res.status(200).json({ message: "Budget updated successfully", budget });
    } catch (error) {
        console.error("Error updating budget:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getBudget = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    try {
        const budgets = await BudgetSchema.find({ recorded_by: decoded.id });
        console.log(budgets)
        const budgetsObj=budgets.reduce((acc,budget)=>{
            acc[budget.category]=budget.amount;
            return acc;
        },{})
        console.log(budgets)
        return res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteBudget = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    const { id } = req.params;

    try {
        const budget = await BudgetSchema.findOneAndDelete({ _id: id, recorded_by: decoded.id });
        if (!budget) {
            return res.status(404).json({ message: "Budget not found or not authorized to delete" });
        }
        return res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
        console.error("Error deleting budget:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
