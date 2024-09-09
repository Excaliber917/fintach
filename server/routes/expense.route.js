import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import { deleteExpense, editExpense, getAllExpenses, setExpense } from '../controller/expense.controller.js'

const expenseRoute = express.Router()

expenseRoute.post("/",verifyUser,setExpense)
expenseRoute.get("/all",verifyUser,getAllExpenses)
expenseRoute.put("/edit/:id",verifyUser,editExpense)
expenseRoute.delete("/delete/:id",verifyUser,deleteExpense)


export default expenseRoute