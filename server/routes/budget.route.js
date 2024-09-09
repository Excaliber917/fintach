import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import { deleteBudget, getAllBudgets, setBudget, updateBudget } from '../controller/budget.controller.js'
const budgetRoute = express.Router()

budgetRoute.post("/",verifyUser,setBudget)
budgetRoute.get("/all",verifyUser,getAllBudgets)
budgetRoute.put("/edit/:id",verifyUser,updateBudget)
budgetRoute.delete("/delete/:id",verifyUser,deleteBudget)



export default budgetRoute