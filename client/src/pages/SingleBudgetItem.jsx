
import { useGetBudgetList } from "../context/BudgetContext";
import { useCalExbyCat } from "../hooks/useCalExpenseByCategory";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UseformatDate } from "../hooks/useSetDate";
import { useSetBudgetList } from "../hooks/useSetBudgetList";
import { useEffect } from "react";
import { useSetExpenseList } from "../hooks/useSetExpenseList";
import { Link } from "react-router-dom";

function SingleBudgetItem() {
    const { budgetList } = useGetBudgetList();

    const { calculateAmount } = useCalExbyCat();
    const { getAllBudgets } = useSetBudgetList()
    const { getAllExpenses } = useSetExpenseList()


    useEffect(() => {
        getAllBudgets()
        getAllExpenses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(budgetList)

    return (
        <div className="min-h-screen dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 bg-gradient-to-b from-blue-50 to-blue-100  text-gray-900 dark:text-gray-100 p-4">
            <h2 className="text-2xl font-semibold  text-gray-800 dark:text-gray-200">Your Budgets</h2>
            <p to='/budgetitems' className="mb-5 text-sm text-blue-600 italic cursor-pointer hover:underline hover:text-blue-700">click on the budgets to edit/delete them</p>
            <div className="w-full">
                {budgetList?.length !== 0 ? (
                    budgetList.map((budget) => {
                        // console.log(budget)
                        const spent = calculateAmount(budget.category, budget.startDate, budget.endDate)||0;
                        const percentage = Math.min((spent / budget.amount) * 100, 100);


                        return (
                            <Link to="/budget" className="bg-white  dark:bg-gray-800 shadow-lg rounded-lg md:py-6 md:px-14 flex flex-col mt-2 dark:border py-4 px-6" key={budget._id}>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">{budget.budgetName}</h3>

                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                                    <div className="w-32 h-32 mb-4 sm:mb-0">
                                        <CircularProgressbar
                                            value={percentage}
                                            text={`${percentage.toFixed(0)}%`}
                                            styles={buildStyles({
                                                textColor: percentage > 100 ? '#EF4444' : '#3B82F6',
                                                pathColor: percentage > 100 ? '#EF4444' : '#3B82F6',
                                                trailColor: '#E5E7EB',
                                            })}
                                        />
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-lg text-gray-600 dark:text-gray-400">
                                            Amount Spent: <span className="font-bold">${spent.toFixed(2)}</span>
                                        </p>
                                        <p className="text-lg text-gray-600 dark:text-gray-400">
                                            Total Budget: <span className="font-bold">${budget.amount.toFixed(2)}</span>
                                        </p>
                                        <p className="text-lg text-gray-600 dark:text-gray-400">
                                            Category: <span className="font-bold">{budget.category}</span>
                                        </p>
                                        <p className="text-lg text-gray-600 dark:text-gray-400">
                                            Date Range: <span className="font-bold">{UseformatDate(budget.startDate)} - {UseformatDate(budget.endDate)}</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center col-span-full text-xl text-gray-800 dark:text-gray-200">
                        No budgets found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleBudgetItem;
