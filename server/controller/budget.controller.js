import SingleBudgetItem from "../model/budget.model.js"
import BudgetList from "../model/budgetList.model.js"

export const setBudget = async (req, res) => {
    try {
        const userId = req.user._id
        const { budgetName, amount, category, startDate, endDate } = req.body

        let budgetList = await BudgetList.findOne({ userId })
        if (!budgetList) {
            budgetList = new BudgetList({ userId, budgets: [] })
            await budgetList.save()
        }

        const newBudget = new SingleBudgetItem({
            budgetName,
            amount,
            category,
            startDate,
            endDate
        })

        if (newBudget)
            await newBudget.save()

        budgetList.budgets.push(newBudget._id)
        await budgetList.save()



        res.status(201).json({
            message: 'Budget created successfully',
            budget: newBudget,
        });


    } catch (error) {
        res.status(500).json({
            message: 'Error creating expense',
            error: error.message,
        });

    }
}


export const getAllBudgets = async (req, res) => {
    try {
        const userId = req.user._id
        const budgetList = await BudgetList.findOne({ userId }).populate('budgets')
        if (!budgetList) {
            return res.status(201).json({ message: "no list" })
        }
        res.status(200).json(budgetList)

    } catch (error) {
        res.status(500).json({
            message: 'Error getting all budgets',
            error: error.message,
        });

    }
}

export const updateBudget = async (req, res) => {
    const { id } = req.params
    try {
        const budgetItem = await SingleBudgetItem.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        if (!budgetItem) {
            return res.status(404).json({
                message: 'Expense not found',
            });
        }
        res.status(200).json({
            message: 'Budget updated successfully',
            budgetItem: budgetItem
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating budget',
            error: error.message,
        });

    }
}

export const deleteBudget = async (req, res) => {

    const { id } = req.params

    try {
        await SingleBudgetItem.findByIdAndDelete(id)

        res.status(200).json({
            message: 'Budget deleted successfully',
        });

    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete budget',
            error: error.message,
        });

    }

}