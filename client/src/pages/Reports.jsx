import { useEffect } from "react";
import Summary from "../components/Summary";
import { useSetBudgetList } from "../hooks/useSetBudgetList";
import { useSetExpenseList } from "../hooks/useSetExpenseList";
import { useTotalExpense } from "../hooks/useTotalExpense";
import { useTotalBudgetAmount } from "../hooks/useTotalBudgetAmount";
import { useAuthContext } from "../context/AuthContext";
import { useGetExenseList } from "../context/ExpenseContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Register chart.js elements
import PieChart from "../components/PieChart";

ChartJS.register(ArcElement, Tooltip, Legend); // Register Pie chart components

function Reports() {
  const { getAllExpenses } = useSetExpenseList();
  const { expenseList } = useGetExenseList(); // Fetching expenses
  const { getAllBudgets } = useSetBudgetList();

  const { totalEXAmount } = useTotalExpense();
  const { totalBDAmount } = useTotalBudgetAmount();
  const { user } = useAuthContext();

  const savingsGoal = user?.savingsGoal || 0; // Handle case where savingsGoal is undefined
  const totalExpenses = totalEXAmount() || 0; // Handle case where totalEXAmount is undefined
  const totalBudgets = totalBDAmount() || 0; // Handle case where totalBDAmount is undefined

  const SavingStatus = savingsGoal - (totalBudgets - totalExpenses); // Calculation with fallback values

  useEffect(() => {
    getAllExpenses();
    getAllBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Step 1: Extract unique categories and sum expenses for each category
  const categoryWiseExpenses = expenseList?.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount || 0; // Ensure expense amount is valid
    return acc;
  }, {}) || {}; // Default to an empty object if expenseList is undefined

  // Step 2: Create data for Category-wise Expenses Pie Chart
  const categoryData = {
    labels: Object.keys(categoryWiseExpenses), // Categories
    datasets: [
      {
        data: Object.values(categoryWiseExpenses), // Corresponding expense amounts
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#0fe8f3", "#ef0ff3", "#780450", "#d68910"], // Colors for each slice
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#0fe8f3", "#ef0ff3", "#780450", "#d68910"],
      },
    ],
  };

  // Step 3: Prepare data for Savings vs Goal Pie Chart
  const savingsData = {
    labels: ["Remaining Amount", "Savings"],
    datasets: [
      {
        data: [Math.max(SavingStatus, 0), savingsGoal > 0 ? savingsGoal - Math.max(SavingStatus, 0) : 0], // Ensure valid data for the chart
        backgroundColor: ["#4BC0C0", "#FFCE56"],
        hoverBackgroundColor: ["#4BC0C0", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Financial Reports</h1>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Category-wise Expenses (Pie Chart) */}
          <PieChart chartData={categoryData} />

          {/* Spending Comparison (Pie Chart) */}
          <PieChart chartData={savingsData} />
        </div>

        {/* Summary */}
        <Summary />
      </div>
    </div>
  );
}

export default Reports;
