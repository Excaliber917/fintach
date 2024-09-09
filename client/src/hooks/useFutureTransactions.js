import { useGetExenseList } from "../context/ExpenseContext"


export const useFutureTransactions = () => {
    const { expenseList } = useGetExenseList()
    
    const futureTransactions = () => {
      
        const today = new Date()
        const upcoming = expenseList?.filter((expense) => new Date(expense.date) > today)
        const sortedPast = upcoming.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Return only the first 3 records
        return sortedPast;
    }
    return { futureTransactions }
}