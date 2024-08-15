const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    payment:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

const expenseModel = mongoose.model('Expense', expenseSchema);

module.exports = expenseModel;