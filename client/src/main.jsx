
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './context/DarkModeContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ExpenseContextProvider } from './context/ExpenseContext.jsx'
import { BudgetContextProvider } from './context/BudgetContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BudgetContextProvider>
      <ExpenseContextProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </ExpenseContextProvider>
    </BudgetContextProvider>
  </AuthContextProvider>
)
