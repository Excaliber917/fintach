import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"; // Adjust the import based on your project structure
import toast from "react-hot-toast";
import axios from "axios";

export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useAuthContext();

    const updateUser = async ({ name, userName, password, email, income,savingsGoal }) => {
        // Verify inputs before making the API request
        const success = VerifyInputs({ user, name, userName, email, income,savingsGoal });
        if (!success) {
            toast.error("No changes detected.");
            return;
        }

        try {
            setLoading(true);

            // Create the data object to send in the API request
            const data = { name, userName, email, income,savingsGoal };

            // Only add the password to the data object if it is provided
            if (password) {
                data.password = password;
            }

            // Send the PUT request to update the user profile
            const res = await axios.put(`https://localhost:5173/api/user/update/${user._id}`, data,{withCredentials:true});

            // Update the user data in local storage and context
            localStorage.setItem("fintechUser", JSON.stringify(res.data));
            toast.success("Profile updated successfully");
            setUser(res.data);
        } catch (error) {
            // Handle any errors that occur during the update process
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            // Reset the loading state
            setLoading(false);
        }
    };

    return { loading, updateUser };
};

// Helper function to verify if the input values have changed
function VerifyInputs({ user, name, userName, email, income,savingsGoal }) {
    // Check if the provided inputs are different from the current user data
    return (
        user.name !== name ||
        user.userName !== userName ||
        user.email !== email ||
        user.income !== income ||
        user.savingsGoal !== savingsGoal
    );
}
