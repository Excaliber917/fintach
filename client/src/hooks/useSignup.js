import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import {  useNavigate } from "react-router-dom"

export const useSignup = ()=>{
    const [loading , setLoading] = useState(false)

    const {setUser} = useAuthContext()
    const navigate = useNavigate()
    const signUp = async (signupData)=>{
        const {name , userName , email , password } = signupData


        const success = verifyInput({name , userName , email , password })
        if(!success)
            return
        try {
            setLoading(true)
            const res = await axios.post("https://localhost:5173/api/auth/signup",{name , userName , email , password },{withCredentials:true})
            // console.log(res.data)
            localStorage.setItem("fintechUser",JSON.stringify(res.data))
            setUser(res.data)
            navigate("/wallet")
            toast.success("sign up successfull")


        } catch (error) {
            toast.error(error.response.data.error)
            
        }finally{
            setLoading(true)
        }
    }

    return {loading,signUp}
}

const verifyInput = ({name , userName , email , password })=>{


    if(!name || !userName || !email || !password )
    {
        toast.error("all fields are required")
        return false
    }
    if(password.lenght<5)
    {
        toast.error("minimum password length is 6 ")
        return false
    }

    return true
}