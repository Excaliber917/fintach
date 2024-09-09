import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Expenses from "./pages/Expenses"
import Budget from "./pages/Budget"
import Profile from "./pages/Profile"
import Reports from "./pages/Reports"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Toaster } from 'react-hot-toast'
import SetIncome from "./pages/SetIncome"
import SingleBudgetItem from "./pages/SingleBudgetItem"
import PrivateRoute from "./components/PrivateRoute"
import Contact from "./pages/Contact"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/expenses" element={<PrivateRoute element={ Expenses} />} />
          <Route path="/budget" element={<PrivateRoute element={Budget} />} />
          <Route path="/budgetitems" element={<PrivateRoute element={SingleBudgetItem} />} />
          <Route path="/report" element={<PrivateRoute element={Reports} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/wallet" element={<PrivateRoute element={SetIncome} />} />
          <Route path="/contact" element={<PrivateRoute element={Contact} />} />


          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


        </Routes>

      </BrowserRouter>
      <Toaster />

    </>
  )
}

export default App
