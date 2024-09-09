import { createContext, useContext, useState } from "react";


const BudgetContext = createContext()


// eslint-disable-next-line react-refresh/only-export-components
export const useGetBudgetList = () => {
    return useContext(BudgetContext)
}

// eslint-disable-next-line react/prop-types
export const BudgetContextProvider = ({ children }) => {
    const [budgetList, setBudgetList] = useState([])


    return <BudgetContext.Provider value={{ budgetList, setBudgetList }}>
        {children}
    </BudgetContext.Provider>
}