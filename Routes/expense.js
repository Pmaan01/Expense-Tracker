const express = require('express');
const {getExpenses, createExpense, getExpenseById, deleteExpense} = require('../controllers/expense')
const Router = express.Router();

// Get all expenses

Router.get('/', getExpenses);

//Creating new expense
Router.post('/', createExpense);

// Get a single expense by ID
Router.get('/:id', getExpenseById)

// Delete an expense by ID
Router.delete('/:id', deleteExpense)
module.exports = Router;

