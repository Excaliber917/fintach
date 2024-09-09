
import { useTotalBudgetAmount } from "../hooks/useTotalBudgetAmount"
import { useAuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useMaxExpense } from "../hooks/useMaxExpense"

function Summary() {

    const { totalBDAmount } = useTotalBudgetAmount()
    const { user } = useAuthContext()
    const {maxExpense} = useMaxExpense()
    const maxExpenseItem = maxExpense()

   



    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Summary</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                This section provides a summary of your financial performance based on the selected time period.
                Insights include trends, total spending, and areas where you might save more.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Total Budget</h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">${totalBDAmount()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Savings Goal</h3>
                        <Link to="/wallet" className='text-sm italic hover:underline text-blue-600 hover:text-blue-700'>set your savings goal</Link>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">${user?.savingsGoal}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Largest Expense</h3>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{`${maxExpenseItem?.expenseName || "Item name"} - ${maxExpenseItem?.amount || "..."}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Summary
