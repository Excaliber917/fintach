import { Link } from 'react-router-dom'
import Transactions from '../components/Transactions';
import { useFutureTransactions } from '../hooks/useFutureTransactions';
import { useGetExenseList } from '../context/ExpenseContext';
import { useEffect, useState } from 'react';
import { useSetExpenseList } from '../hooks/useSetExpenseList';
import { usePastTransactions } from '../hooks/usePastTransactions';

import { useSetBudgetList } from '../hooks/useSetBudgetList';
import BudgetStatus from '../components/BudgetStatus';
import Overview from '../components/Overview';

function Home() {

    const { futureTransactions } = useFutureTransactions()
    const { pastTransactions } = usePastTransactions()
    const { getAllExpenses } = useSetExpenseList();
    const { getAllBudgets } = useSetBudgetList()
    const { expenseList } = useGetExenseList()

    const [transactions, setTransactions] = useState({
        past: [],
        upcoming: []
    })

    useEffect(() => {
        getAllExpenses()
        getAllBudgets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(budgetList)


    useEffect(() => {
        if (expenseList?.length > 0) {
            const upcomingList = futureTransactions();
            const pastList = pastTransactions();
            setTransactions({
                past: pastList,
                upcoming: upcomingList
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenseList]);

    return (
        <div className="min-h-screen dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 bg-gradient-to-b from-blue-50 to-blue-100  text-gray-900 dark:text-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400">Overview of your financial status</p>
                    </div>
                    <Link to="/report" className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-800">
                        See Report
                    </Link>
                </div>

                {/* Financial Summary Widget */}
                <Overview />

                {/* Recent Transactions */}
                <Transactions heading={"Past"} list={transactions.past} />
                <Transactions heading={"Upcoming"} list={transactions.upcoming} />


                {/* Budget Overview */}
                <BudgetStatus />
            </div>
        </div>
    );
}

export default Home;
