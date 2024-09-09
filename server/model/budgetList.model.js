import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const budgetListSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    budgets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SingleBudgetItem',  // Reference to the SingleBudgetItem model
    }]
}, {
    timestamps: true,
});

const BudgetList = model('BudgetList', budgetListSchema);

export default BudgetList;
