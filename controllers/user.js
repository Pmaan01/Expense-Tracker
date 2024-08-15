const userModel = require('../models/user');

const registerUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({
                success: false,
                message: 'User already registered with this email'
            });
        }

        const newUser = new userModel({ name, email });
        const savedUser = await newUser.save();

        console.log('User registered successfully', savedUser);

        return res.status(201).json({
            success: true,
            data: savedUser
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Registration failed. Please try again later.'
        });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to retrieve users'
        });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to retrieve user'
        });
    }
};

module.exports = { registerUser, getAllUsers, getUserById };
