import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const expenseListSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',  // Reference to the Expense model
    }],
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const ExpenseList = model('ExpenseList', expenseListSchema);

export default ExpenseList;
