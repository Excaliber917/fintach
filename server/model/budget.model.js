import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const singleBudgetItemSchema = new Schema({
  budgetName: {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const SingleBudgetItem = model('SingleBudgetItem', singleBudgetItemSchema);

export default SingleBudgetItem;
