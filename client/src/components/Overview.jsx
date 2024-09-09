
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useTotalBudgetAmount } from '../hooks/useTotalBudgetAmount'
import { useTotalExpense } from '../hooks/useTotalExpense'
function Overview() {
    const { user } = useAuthContext()
    const { totalEXAmount } = useTotalExpense()
    const { totalBDAmount } = useTotalBudgetAmount()


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-medium">Total Balance</h2>
                <p className="text-3xl font-bold mt-2">${user.income - totalEXAmount()}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-medium">Total Expenses</h2>
                <p className="text-3xl font-bold mt-2">${totalEXAmount()}</p>
                <Link to="/expenses" className='text-sm italic hover:underline text-blue-600 hover:text-blue-700'>Add Expense</Link>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-medium">Wallet Amount</h2>
                <p className="text-3xl font-bold mt-2">${user.income}</p>
                <Link to="/wallet" className='text-sm italic hover:underline text-blue-600 hover:text-blue-700'>Set Wallet</Link>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-medium">Budgets - Expenses</h2>
                <p className="text-3xl font-bold mt-2">${totalBDAmount() - totalEXAmount()}</p>
                <Link to="/wallet" className='text-sm italic hover:underline text-blue-600 hover:text-blue-700'>Set Savings Goal</Link>
            </div>
        </div>
    )
}

export default Overview
