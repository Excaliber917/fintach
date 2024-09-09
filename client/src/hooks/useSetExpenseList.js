import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useGetExenseList } from "../context/ExpenseContext"

export const useSetExpenseList = () => {
    const [loading, setLoading] = useState(false)
    const {setExpenseList } = useGetExenseList()
    const getAllExpenses = async () => {
        try {
            setLoading(true)

            const allExpenses = await axios.get("https://localhost:5173/api/expense/all",{withCredentials:true})
            setExpenseList(allExpenses.data.expenses)


        } catch (error) {
            console.log(error)
            toast.error(error.data.message)

        } finally {
            setLoading(false)
        }
    }

    return { loading, getAllExpenses }
}