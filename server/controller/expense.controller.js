import Expense from '../model/expense.model.js'
import ExpenseList from '../model/expenseList.model.js'

export const setExpense = async (req, res) => {
    const userId = req.user._id;
    const { expenseName, amount, category, date } = req.body;

    try {
        // Find the user's ExpenseList, or create one if it doesn't exist
        let expenseList = await ExpenseList.findOne({ userId });

        if (!expenseList) {
            expenseList = new ExpenseList({ userId, expenses: [] });
            await expenseList.save();
        }

        // Create a new expense
        const newExpense = new Expense({
            listId: expenseList._id,
            expenseName,
            amount,
            category,
            date
        });

        // Save the expense
        const savedExpense = await newExpense.save();

        // Add the new expense ID to the user's ExpenseList
        expenseList.expenses.push(savedExpense._id);
        await expenseList.save();

        res.status(201).json({
            message: 'Expense created successfully',
            expense: savedExpense,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in creating expense',
            error: error.message,
        });
    }
};


export const getAllExpenses = async (req, res) => {
    try {
        const userId = req.user._id
        const expenseList = await ExpenseList.findOne({ userId }).populate('expenses')
        if (!expenseList) {
            return res.status(201).json({ message: "no list" })
        }
        res.status(200).json(expenseList)
    } catch (error) {
        res.status(500).json({
            message: 'Error getting all expenses',
            error: error.message,
        });

    }
}


export const editExpense = async (req, res) => {
    const { id } = req.params; // Get the expense ID from the request parameters

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id,{$set:req.body},{new:true})

        if (!updatedExpense) {
            return res.status(404).json({
                message: 'Expense not found',
            });
        }
        res.status(200).json({
            message: 'Expense updated successfully',
            updatedExpense:updatedExpense
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating expense',
            error: error.message,
        });
    }
};

export const deleteExpense = async (req, res) => {
    const userId = req.user._id;
    const { id: expenseId } = req.params;

    try {
        // Find the expense by ID
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found',
            });
        }

        // Verify the expense belongs to the user
        const expenseList = await ExpenseList.findOne({ userId });
        if (!expenseList) {
            return res.status(404).json({
                message: 'Expense list not found',
            });
        }

        // Remove the expense ID from the user's ExpenseList
        expenseList.expenses = expenseList.expenses.filter(id => id.toString() !== expenseId);

        // Save the updated ExpenseList
        await expenseList.save();

        // Delete the expense from the Expense model
        await Expense.findByIdAndDelete(expenseId);

        res.status(200).json({
            message: 'Expense deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete the expense',
            error: error.message,
        });
    }
};
