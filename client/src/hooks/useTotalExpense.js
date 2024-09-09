import { useGetExenseList } from "../context/ExpenseContext"

export const useTotalExpense = () => {
    const { expenseList } = useGetExenseList()
    const totalEXAmount = () => {
        const totalEXAmount = expenseList?.map((item) => {
            return item.amount
        }).reduce((sum, amount) => sum + amount, 0)

        // console.log(totalAmount)

        return totalEXAmount || 0
    }
    return {totalEXAmount}

}