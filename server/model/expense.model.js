import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpenseList',  // Reference to the ExpenseList model
    required: true,
  },
  expenseName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure the amount is not negative
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Expense = model('Expense', expenseSchema);

export default Expense;
