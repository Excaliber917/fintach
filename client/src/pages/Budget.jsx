import { useEffect, useState } from 'react';
import { useAddBudget } from '../hooks/useAddBudget';
import { useGetBudgetList } from '../context/BudgetContext';
import { useSetBudgetList } from '../hooks/useSetBudgetList';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { UseformatDate } from '../hooks/useSetDate'
import { useDeleteBudget } from '../hooks/useDeleteBudget';
import { useEditBudget } from '../hooks/useEditBudget';
import Nprogress from 'nprogress'
import { useNavigate } from 'react-router-dom';
function Budget() {
  const [formData, setFormData] = useState({
    budgetName: '',
    amount: '',
    category: '',
    startDate: '',
    endDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate()
  const { loading, addBudget } = useAddBudget();
  const { budgetList } = useGetBudgetList();
  const { getAllBudgets } = useSetBudgetList();
  const { updateBudget } = useEditBudget()

  useEffect(() => {
    getAllBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateBudget(formData, editId)
      setIsEditing(false)
    }
    else {
      addBudget(formData);
    }
    setFormData({
      budgetName: '',
      amount: '',
      category: '',
      startDate: '',
      endDate: '',
    })
    navigate("/expenses")
  };

  const handleEdit = (budget) => {
    // Logic for editing a budget
    setIsEditing(true);
    setEditId(budget._id);
    setFormData(
      {
        budgetName: budget.budgetName,
        amount: budget.amount,
        category: budget.category,
        startDate: budget.startDate.split('T')[0],
        endDate: budget.endDate.split('T')[0],
      }
    )
  };
  const { deleteBudget } = useDeleteBudget()
  const handleDelete = (id) => {
    deleteBudget(id)

  };


  // Configure NProgress for a slower progress bar
  Nprogress.configure({
    showSpinner: false,
    speed: 800,       // Slower animation speed
    trickleSpeed: 200 // Slower trickling speed
  });

  useEffect(() => {
    if (loading) {
      Nprogress.start(); // Start the loading bar when loading is true
    } else {
      Nprogress.done(); // Complete the loading bar when loading is false
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Budget Management</h1>

        {/* Budget Input Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Create New Budget</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Budget Name</label>
                <input
                  type="text"
                  name="budgetName"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  placeholder="Enter budget name"
                  value={formData.budgetName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
            >
              {isEditing ? 'Update Budget' : 'Create Budget'}
            </button>
          </form>

        </div>

        {/* Budget List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Your Budgets</h2>

          {budgetList?.length !== 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-300">
                    <th className="py-3 px-4 font-semibold text-sm">Budget Name</th>
                    <th className="py-3 px-4 font-semibold text-sm">Category</th>
                    <th className="py-3 px-4 font-semibold text-sm">Amount</th>
                    <th className="py-3 px-4 font-semibold text-sm">Date Range</th>
                    <th className="py-3 px-4 font-semibold text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetList?.map((item) => (
                    <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-300 truncate max-w-[150px] md:max-w-[300px]">
                        {item.budgetName}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-300 truncate max-w-[150px] md:max-w-[300px]">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">${item.amount}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {UseformatDate(item.startDate)} - {UseformatDate(item.endDate)}
                      </td>
                      <td className="py-3 px-4 text-right flex items-center justify-end gap-4">
                        <FaEdit
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 cursor-pointer"
                          onClick={() => handleEdit(item)}
                        />
                        <FaTrashAlt
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center md:text-2xl text-xl text-gray-400 h-44">
              Add a budget
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Budget;
