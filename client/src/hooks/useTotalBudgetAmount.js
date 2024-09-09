import { useGetBudgetList } from "../context/BudgetContext"


export const useTotalBudgetAmount = () => {
    const { budgetList } = useGetBudgetList()

    const totalBDAmount = () => {
        const totalBDAmount = budgetList?.map((item) => {
            return item.amount
        }).reduce((sum, amount) => sum + amount, 0)

        // console.log(totalBDAmount)

        return totalBDAmount || 0
    }
    return {totalBDAmount}

}