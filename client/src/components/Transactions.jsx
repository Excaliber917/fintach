import { useState } from "react";
import { UseformatDate } from "../hooks/useSetDate";

// eslint-disable-next-line react/prop-types
function Transactions({ heading, list }) {
    const [isFullList, setIsFullList] = useState(false);
    // eslint-disable-next-line react/prop-types
    const slicedList = isFullList ? list : list.slice(0, 3);

    const handleList = () => {
        setIsFullList(!isFullList);
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold">{heading} Transactions</h2>
            <p className="mb-2 text-sm text-blue-600 italic cursor-pointer hover:underline hover:text-blue-700" onClick={handleList}>{`Click here for the ${isFullList ? 'collapse' : 'full'} list`}</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
               
                {slicedList?.length !== 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-300">
                                    <th className="py-3 px-4 font-semibold text-sm">Expense Name</th>
                                    <th className="py-3 px-4 font-semibold text-sm">Amount</th>
                                    <th className="py-3 px-4 font-semibold text-sm">Category</th>
                                    <th className="py-3 px-4 font-semibold text-sm">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                         
                                {slicedList?.map((item) => (
                                    <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="py-3 px-4 text-gray-800 dark:text-gray-300 truncate">{item.expenseName}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 truncate">${item.amount}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 truncate">{item.category}</td>
                                        <td className="py-3 px-4 text-gray-500 dark:text-gray-500 text-sm">{UseformatDate(item.date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center md:text-2xl text-xl text-gray-400 h-44">
                        No {heading} expense
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;
