import { useGetExenseList } from "../context/ExpenseContext";

export const useMaxExpense = () => {
    const { expenseList } = useGetExenseList();

    const maxExpense = () => {
        
        if (expenseList?.length === 0) return null; // Handle case when expenseList is empty

        // Use reduce to find the expense with the maximum amount
        const maxExpenseItem = expenseList?.reduce((max, expense) => {
        
            return expense.amount > max.amount ? expense : max;
        }, expenseList[0]); // Initialize with the first expense item

        return maxExpenseItem;
    };

    return { maxExpense };
};
