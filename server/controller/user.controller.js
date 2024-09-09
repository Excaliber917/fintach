import User from "../model/user.model.js";
import bcrypt from 'bcrypt'

export const updateUser = async (req, res) => {

    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        if (!updatedUser)
            return res.status(500).json({ message: "unable to update the user" })
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            userName: updatedUser.userName,
            email: updatedUser.email,
            income: updatedUser.income,
            savingsGoal:updatedUser.savingsGoal
        })


    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ error: error.message })

    }
}