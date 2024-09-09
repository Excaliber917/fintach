import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

const verifyUser = async (req, res, next) => {
    const token = req.cookies.cookie
    try {

        if (!token)
            return res.status(400).json({ error: "cannot achive the token" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded)
            return res.status(400).json({ error: "not a valid token" })
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(400).json({ error: "cannot able to get the user" })
        }
        req.user = user

        next()

    }
    catch (error) {
        console.log(error)
    }



}

export default verifyUser