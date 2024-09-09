import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './db/connectDb.js';
import authRoute from './routes/auth.route.js';
import expenseRoute from './routes/expense.route.js';
import budgetRoute from './routes/budget.route.js';
import userRoute from './routes/user.route.js';
import cors from 'cors'
dotenv.config()
const app = express()

const corsOptions = {
    origin: 'https://localhost:5173', //  frontend URL
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())


app.use("/api/auth",authRoute)
app.use("/api/expense",expenseRoute)
app.use("/api/budget",budgetRoute)
app.use("/api/user",userRoute)




app.listen(process.env.PORT,()=>{
    connectDb()
    console.log("app is running")
})