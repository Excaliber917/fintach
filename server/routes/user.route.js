import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import { updateUser } from '../controller/user.controller.js'
const userRoute = express.Router()
userRoute.put("/update/:id",verifyUser,updateUser)

export default userRoute