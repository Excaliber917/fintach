import { createContext, useContext, useState } from "react";


const ExpenseContext = createContext()


// eslint-disable-next-line react-refresh/only-export-components
export const useGetExenseList = () => {
    return useContext(ExpenseContext)
}

// eslint-disable-next-line react/prop-types
export const ExpenseContextProvider = ({ children }) => {
    const [expenseList, setExpenseList] = useState([])


    return <ExpenseContext.Provider value={{ expenseList, setExpenseList }}>
        {children}
    </ExpenseContext.Provider>
}