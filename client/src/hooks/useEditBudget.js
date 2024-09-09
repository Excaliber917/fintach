import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGetBudgetList } from '../context/BudgetContext';

export const useEditBudget = () => {
    const [loading, setLoading] = useState(false);
    const { budgetList, setBudgetList } = useGetBudgetList()
    const updateBudget = async ({ budgetName, amount, category, startDate, endDate }, id) => {
        try {
            setLoading(true);
            const res = await axios.put(`https://localhost:5173/api/budget/edit/${id}`, { budgetName, amount, category, startDate, endDate },{withCredentials:true});
            const updatedBudget = res.data.budgetItem

            const updatedBudgetList = budgetList.map((budget) => (
                budget._id === id ? updatedBudget : budget
            ))

            setBudgetList(updatedBudgetList)
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateBudget };
};
