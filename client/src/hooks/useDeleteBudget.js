import axios from "axios";
import toast from "react-hot-toast";
import { useGetBudgetList } from "../context/BudgetContext";

export const useDeleteBudget = () => {
    const { budgetList, setBudgetList } = useGetBudgetList()
    const deleteBudget = async (id) => {
        try {
            const res = await axios.delete(`hhttps://localhost:5173/api/budget/delete/${id}`,{withCredentials:true});
            toast.success(res.data.message);
            setBudgetList(budgetList.filter((item)=>item._id !== id))
         
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error deleting budget");
        }
    };

    return { deleteBudget };
};
