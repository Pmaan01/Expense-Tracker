const expenseModel = require('../models/expenses');
const userModel = require('../models/user');

const getExpenses = async(req, res) =>{
    try{
        const allExpenses = await expenseModel.find();
        return res.status(200).json({
            success: true,
            data: allExpenses
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            data: null,
            error
        })
    }
}

const createExpense = async (req, res) => {
    const { user, name, description, amount, category, payment } = req.body;

//if user exist
const userExist = await userModel.findById(user);
if(!userExist){
    return res.status(404).json({
        success: false,
        data: null,
        error: 'User Not Found'
    })
}
    const newExpense = new expenseModel({
        user,
        name,
        description,
        amount,
        category,
        payment
    });

    try {
        const newlyCreatedExpense = await newExpense.save();
        return res.status(201).json({
            success: true,
            data: newlyCreatedExpense
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to create expense. Please try again later.'
        });
    }
};

const getExpenseById = async (req, res) =>{
    const{id} = req.params;

    try{
        const expense = await expenseModel.findById(id);
        if(expense){
            return res.status(200).json({
                success: true,
                data: expense
            })
        }else{
            return res.status(404).json({
                success: false,
                data: null,
                error: 'Expense Not Found'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            data: null,
            error
        })

    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await expenseModel.findByIdAndDelete(id);
        if (deletedExpense) {
            return res.status(200).json({
                success: true,
                data: deletedExpense,
                message: 'Expense successfully deleted',
            });
        } else {
            return res.status(404).json({
                success: false,
                data: null,
                error: 'Expense Not Found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: 'Error deleting expense',
        });
    }
};
module.exports = { 
    getExpenses,
    createExpense,
    getExpenseById,
    deleteExpense
 };