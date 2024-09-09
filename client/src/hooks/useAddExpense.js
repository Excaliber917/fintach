import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useGetExenseList } from "../context/ExpenseContext"

export const useAddExpense = () => {
    const [loading, setLoading] = useState(false)
    const { expenseList, setExpenseList } = useGetExenseList()
    const addExpense = async ({ expenseName, amount, category, date }) => {
        const success = verifyInputs({ expenseName, amount, category, date })
        if (!success)
            return

        try {
            setLoading(true)
            // console.log(loading)
            const res = await axios.post('https://localhost:5173/api/expense/', {
                expenseName,
                amount,
                category,
                date
            },{withCredentials:true})
            // console.log(res.data)
            const updatedExpenseList = Array.isArray(expenseList) ? expenseList : []
            setExpenseList([...updatedExpenseList,res.data.expense])
            toast.success(res.data.message)


        } catch (error) {
            console.log(error)
            toast.error(error.data.message)

        } finally {
            setLoading(false)
        }

    }

    return { loading, addExpense }
}

const verifyInputs = ({ expenseName, amount, category, date }) => {
    if (!expenseName || !amount || !category || !date) {
        toast.error("fields are empty")
        return false
    }

    return true
}