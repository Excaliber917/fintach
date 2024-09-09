import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Nprogress from 'nprogress'
function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',

    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const { loading, signUp } = useSignup()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData); // Log the form data to the console

        signUp(formData)

    };

    // Configure NProgress for a slower progress bar
    Nprogress.configure({
        showSpinner: false,
        speed: 800,       // Slower animation speed
        trickleSpeed: 200 // Slower trickling speed
    });

    useEffect(() => {
        if (loading) {
            Nprogress.start(); // Start the loading bar when loading is true
        } else {
            Nprogress.done(); // Complete the loading bar when loading is false
        }
    }, [loading]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700  flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                            placeholder="Enter your username"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type='button'
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 rounded-lg bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
