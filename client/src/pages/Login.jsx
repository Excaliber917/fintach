import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLogin } from '../hooks/useLogin';
import Nprogress from 'nprogress'

function Login() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { loading, login } = useLogin()
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login
                    </button>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Dont have an account?{' '}
                        <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
