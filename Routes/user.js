const express = require('express');
const { registerUser, getAllUsers, getUserById  } = require('../controllers/user');
const Router = express.Router();

// Register a new user
Router.post('/', registerUser);

// Get all users
Router.get('/', getAllUsers);

// Get a user by ID
Router.get('/:id', getUserById);


module.exports = Router;
