const ExpenseSchema = require("../models/expense.model")
const jwt = require("jsonwebtoken");

exports.addExpense = async (req, res) => {
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

    console.log('Request Body:', req.body);
    console.log('Decoded Token:', decoded);
    console.log('Decoded Token:', decoded.id);
    const { title, amount, category, description, date } = req.body;

    // Validations
    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: "All fields required" });
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }

    const expense = new ExpenseSchema({
        title,
        amount: parseFloat(amount),
        category,
        description,
        date,
        recorded_by: decoded.id,
    });

    console.log(expense)
    try {
        await expense.save();
        res.status(200).json({ message: "Expense added" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getExpenses = async (req, res) => {
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
        const expenses = await ExpenseSchema.find({ recorded_by: decoded.id });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
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

    const userId = decoded.id;
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        if (expense.recorded_by.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense Deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


exports.updateExpense = async (req, res) => {
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

    const userId = decoded.id;
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        const expense = await ExpenseSchema.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        if (expense.recorded_by.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        // Update the fields
        expense.title = title || expense.title;
        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.description = description || expense.description;
        expense.date = date || expense.date;

        await expense.save();
        res.status(200).json({ message: "Expense updated" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getExpensesByCategory = async (req, res) => {
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
        const expenses = await ExpenseSchema.find({ recorded_by: decoded.id });
        const groupedExpenses = [];

        expenses.forEach((expense) => {
            const existingCategory = groupedExpenses.find(
                (item) => item.category === expense.category
            );
            if (existingCategory) {
                existingCategory.amount += expense.amount;
            } else {
                groupedExpenses.push({ category: expense.category, amount: expense.amount });
            }
        });

        res.status(200).json(groupedExpenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


