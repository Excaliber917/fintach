import axios from "axios"
import toast from "react-hot-toast"
import { useGetExenseList } from "../context/ExpenseContext"

export const useDeleteExpense = () => {

    const { expenseList, setExpenseList } = useGetExenseList()
    const deleteExpense = async (id) => {


        try {
            const res = await axios.delete(`https://localhost:5173/api/expense/delete/${id}`,{withCredentials:true})
            toast.success(res.data.message)
            setExpenseList(expenseList.filter((item) => item._id !== id))

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)

        }
    }

    return { deleteExpense }


}