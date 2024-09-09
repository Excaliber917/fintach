import User from "../model/user.model.js"
import bcrypt from 'bcrypt'
import genToken from "../utils/genToken.js";
// Email validation function
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
export const signUp = async (req, res) => {
    try {
        const { name, userName, email, password, income,savingsGoal } = req.body
        const user = await User.findOne({ userName })
        if (user)
            return res.status(400).json({ error: "user already exits" })

        // Check if the email is valid
        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        if(income < 0 )
        {
            return res.status(400).json({ error: "Income cannot be negative" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        const newUser = await User({
            name,
            userName,
            password: hashPassword,
            email,
            income,
            savingsGoal
        })


        if (newUser) {
            await newUser.save()
            genToken(newUser._id, res)


            return res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                userName: newUser.userName,
                email: newUser.email,
                income: newUser.income,
                savingsGoal: newUser.savingsGoal
            })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "signup Unsuccessfull" })

    }
}

export const login = async (req, res) => {
    const { userName, password } = req.body


    try {

        const user = await User.findOne({ userName })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        // console.log(isPasswordCorrect)
        if (!user) {

            return res.status(400).json({ error: "user not exists" })
        }

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "password is not correct" })

        }

        genToken(user._id, res)

        return res.status(200).json({

            _id: user._id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            gender: user.gender,
            income: user.income,
            savingsGoal: user.savingsGoal,
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message })
    }

}

export const logout = (req, res) => {
    try {
        res.cookie("cookie", "", { maxAge: 0 })
        res.status(200).json({ message: "loged out successfully" })

    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ error: error.message })
    }
}