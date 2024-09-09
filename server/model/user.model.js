import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    income: {
        type: Number,
        default: 0, // Default income can be set to 0 or a different value if desired
    },
    savingsGoal: {
        type: Number,
        default: 0, // Default income can be set to 0 or a different value if desired
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User