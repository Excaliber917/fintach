
import { useGetExenseList } from "../context/ExpenseContext";



export const useCalExbyCat = () => {
    const { expenseList } = useGetExenseList();
   
    const calculateAmount = (category, startDate, endDate) => {

        const totalAmount = expenseList?.filter((item) => {
                const itemDate = new Date(item.date);
                const start = new Date(startDate);
                const end = new Date(endDate);

                // Filter by category and check if the item's date is within the range
                return (
                    item.category === category &&
                    itemDate >= start &&
                    itemDate <= end
                );
            })
            .reduce((sum, item) => sum + item.amount, 0); // Sum up the amounts
     


        return totalAmount;
    };

    return { calculateAmount };
};
