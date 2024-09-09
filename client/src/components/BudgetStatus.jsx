import { Link } from "react-router-dom";
import { useGetBudgetList } from "../context/BudgetContext";
import { useCalExbyCat } from "../hooks/useCalExpenseByCategory";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function BudgetStatus() {
    const { budgetList } = useGetBudgetList();
    const { calculateAmount } = useCalExbyCat();

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold  text-gray-800 dark:text-gray-200">Budget Overview</h2>
            <Link to='/budgetitems' className="mb-5 text-sm text-blue-600 italic cursor-pointer hover:underline hover:text-blue-700">
                click here to see the full list
            </Link>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {budgetList && budgetList.length !== 0 ? (
                    budgetList.map((budget) => {
                        const spent = calculateAmount(budget.category, budget.startDate, budget.endDate) || 0;  // Ensure spent defaults to 0
                        const percentage = budget.amount > 0
                            ? Math.min((spent / budget.amount) * 100, 100)  // Avoid division by 0, cap percentage at 100%
                            : 0;

                        return (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center" key={budget._id}>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{budget.budgetName}</h3>
                                <div className="w-32 h-32 mb-4">
                                    <CircularProgressbar
                                        value={Number(percentage)}
                                        text={`${percentage.toFixed(0)}%`}
                                        styles={buildStyles({
                                            textColor: percentage > 100 ? '#EF4444' : '#3B82F6',
                                            pathColor: percentage > 100 ? '#EF4444' : '#3B82F6',
                                            trailColor: '#E5E7EB',
                                        })}
                                    />
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    ${spent.toFixed(2)} / ${budget.amount?.toFixed(2) || "0.00"}  {/* Ensure amount has a valid value */}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <>
                        <div className="dark:bg-gray-800 h-64 bg-gray-300 shadow-md rounded flex items-center justify-center text-xl dark:text-gray-500 border">
                            No budget set yet
                        </div>
                        <div className="dark:bg-gray-800 h-64 bg-gray-300 shadow-md rounded flex items-center justify-center text-xl dark:text-gray-500 border">
                            No budget set yet
                        </div>
                        <div className="dark:bg-gray-800 h-64 bg-gray-300 shadow-md rounded flex items-center justify-center text-xl dark:text-gray-500 border">
                            No budget set yet
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default BudgetStatus;
