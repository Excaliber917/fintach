import { useGetExenseList } from "../context/ExpenseContext"

export const usePastTransactions = () => {
    const { expenseList } = useGetExenseList();

    const pastTransactions = () => {
        const today = new Date();
        // Filter past transactions
        const past = expenseList?.filter((expense) => new Date(expense.date) < today);

        // Sort by date in descending order (newest first)
        const sortedPast = past.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Return only the first 3 records
        return sortedPast;
    };

    return { pastTransactions };
};
