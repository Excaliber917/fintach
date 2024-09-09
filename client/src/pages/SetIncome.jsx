import { useState } from "react";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { useAuthContext } from '../context/AuthContext';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useNavigate } from "react-router-dom";

function SetIncome() {
    const { user } = useAuthContext();
    const { loading, updateUser } = useUpdateUser();

    // Handle as strings for input purposes
    const [income, setIncome] = useState(user?.income?.toString() || "0");
    const [savingsGoal, setSavingsGoal] = useState(user?.savingsGoal?.toString() || "0");
    const navigate = useNavigate()
    const handleIncomeChange = (e) => setIncome(e.target.value);
    const handleSavingsGoalChange = (e) => setSavingsGoal(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert to number just before updating
        updateUser({
            income: Number(income),
            savingsGoal: Number(savingsGoal)
        });
        navigate("/budget")
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 flex flex-col items-center justify-center px-4">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-200 mb-2">Manage Your Finances</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Set your income and start your savings journey today!</p>
                <p className="text-lg text-gray-600 dark:text-gray-400">Remember, every penny saved is a penny earned.</p>
            </header>

            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Set Your Income</h2>
                <div className="flex items-center mb-6">
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={Number(income)} // Convert to number for the range input
                        onChange={(e) => setIncome(e.target.value)}
                        className="w-full"
                    />
                    <span className="ml-4 text-xl font-bold text-gray-800 dark:text-gray-200">${income}</span>
                </div>
                <input
                    type="text"
                    value={income}
                    onChange={handleIncomeChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    placeholder="Enter your income"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-200 
                hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 
                ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
                <BsFillPiggyBankFill className="mr-2 text-xl" />
                {loading ? 'Saving...' : 'Save My Income'}
            </button>

            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Set Your Savings Goal</h2>
                <div className="flex items-center mb-6">
                    <input
                        type="range"
                        min="0"
                        max={Number(income)}
                        value={Number(savingsGoal)} // Convert to number for the range input
                        onChange={(e) => setSavingsGoal(e.target.value)}
                        className="w-full"
                    />
                    <span className="ml-4 text-xl font-bold text-gray-800 dark:text-gray-200">${savingsGoal}</span>
                </div>
                <input
                    type="text"
                    value={savingsGoal}
                    onChange={handleSavingsGoalChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    placeholder="Enter your savings goal"
                />
            </div>
        </div>
    );
}

export default SetIncome;
