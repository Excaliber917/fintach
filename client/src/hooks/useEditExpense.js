import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useGetExenseList } from '../context/ExpenseContext'

export const useEditExpense = () => {
    const [loading, setLoading] = useState(false)
    const { expenseList, setExpenseList } = useGetExenseList()
    const updateExpense = async ({ expenseName, amount, category, date }, id) => {

        try {
            const res = await axios.put(`https://localhost:5173/api/expense/edit/${id}`, { expenseName, amount, category, date },{withCredentials:true})
            const updatedExpense = res.data.updatedExpense;
            
            // Update the expense in the list
            const updatedExpenseList = expenseList.map(expense =>
                expense._id === id ? updatedExpense : expense
            );

            setExpenseList(updatedExpenseList);
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return { loading, updateExpense }
}