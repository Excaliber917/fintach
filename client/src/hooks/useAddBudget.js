import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetBudgetList } from "../context/BudgetContext";

export const useAddBudget = () => {
    const [loading, setLoading] = useState(false);
    const { budgetList, setBudgetList } = useGetBudgetList()
    const addBudget = async ({ budgetName, amount, category, startDate, endDate }) => {
        const success = verifyInputs({ budgetName, amount, category, startDate, endDate });
        if (!success) return;

        try {
            setLoading(true);
            const res = await axios.post('https://localhost:5173/api/budget/', {
                budgetName,
                amount,
                category,
                startDate,
                endDate
            },{withCredentials:true});
            const updatedBudgetList = Array.isArray(budgetList) ? budgetList : [];
            setBudgetList([...updatedBudgetList, res.data.budget]);
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error adding budget");
        } finally {
            setLoading(false);
        }
    };

    return { loading, addBudget };
};

const verifyInputs = ({ budgetName, amount, category, startDate, endDate }) => {
    if (!budgetName || !amount || !category || !startDate || !endDate) {
        toast.error("All fields are required");
        return false;
    }

    return true;
};
