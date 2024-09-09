
import { Pie } from "react-chartjs-2"; // Pie chart component from react-chartjs-2
// eslint-disable-next-line react/prop-types
function PieChart({chartData}) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Category-wise Expenses</h2>
            <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg h-fit pb-10 px-2 pt-2 md:h-[400px]">
                <Pie data={chartData} />
            </div>
        </div>
    )
}

export default PieChart
