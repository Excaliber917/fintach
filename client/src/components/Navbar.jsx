import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaHome, FaMoneyBillWave, FaRegChartBar, FaBars, FaSun, FaMoon, FaWallet } from 'react-icons/fa';
import { RiAccountCircleLine } from 'react-icons/ri';
import { IoLogOutOutline } from "react-icons/io5";
import logo from '../assets/logo.png'
import { useDarkMode } from '../context/DarkModeContext';
import { useAuthContext } from '../context/AuthContext'
import useLogout from '../hooks/useLogout';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const { user } = useAuthContext();
    const { logout } = useLogout()
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => location.pathname === path ? 'border-b-2 rounded' : '';

    return (
        <nav className="bg-gradient-to-b from-blue-500 to-blue-400 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 text-white p-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
            </div>



            {/* Navigation Links */}
           {user && ( <div className="hidden md:flex items-center space-x-6">
                <div className={`flex items-center hover:text-gray-200 dark:hover:text-gray-400 ${isActive('/')}`}>

                    <Link to="/" className='flex items-center gap-1'> <FaHome />Home</Link>
                </div>
                <div className={`flex items-center hover:text-gray-200 dark:hover:text-gray-400 ${isActive('/expenses')}`}>

                    <Link to="/expenses" className='flex items-center gap-1'><FaMoneyBillWave />Expenses</Link>
                </div>
                <div className={`flex items-center hover:text-gray-200 dark:hover:text-gray-400 ${isActive('/budget')}`}>

                    <Link to="/budget" className='flex items-center gap-1'><FaRegChartBar />Budget</Link>
                </div>
            </div>)}


            <div className="flex items-center gap-3 justify-center px-2">
                {/* Dark Mode Toggle Button and User Authentication */}
                <button onClick={toggleDarkMode} className="focus:outline-none hidden md:flex">
                    {isDarkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-white" />}
                </button>
                {user ? (
                    <div className="hidden md:flex items-center relative">
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onMouseEnter={() => setShowMenu(true)}
                            onMouseLeave={() => setShowMenu(false)}
                        >
                            <p className="font-semibold hover:text-gray-400 text-2xl">{user.userName}</p>
                            <RiAccountCircleLine size={25} />
                        </div>

                        {showMenu && (
                            <div
                                className="absolute right-0 top-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
                                onMouseEnter={() => setShowMenu(true)}
                                onMouseLeave={() => setShowMenu(false)}
                            >
                                <ul className="py-2 text-gray-700 dark:text-gray-200">
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/wallet"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Set Wallet
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/login" className="border-2 py-1 rounded px-3 hover:bg-blue-700 dark:hover:bg-slate-700">Login</Link>
                        <Link to="/signup" className="border-2 py-1 rounded px-3 hover:bg-blue-700 dark:hover:bg-slate-700">Sign up</Link>
                    </div>
                )}
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleSidebar}>
                    <FaBars className="h-6 w-6" />
                </button>
            </div>

            {/* Sidebar for Mobile */}
            {isOpen && (
                <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-blue-500 to-blue-400 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 z-50 p-4">
                    <div className="flex justify-end gap-2">
                        <button onClick={toggleDarkMode} className="focus:outline-none">
                            {isDarkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-white" />}
                        </button>
                        <button onClick={toggleSidebar} className="text-white">
                            Close
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4 mt-4">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-2">
                                    <Link to="/profile" onClick={toggleSidebar} className="text-xl hover:text-gray-400 flex items-center gap-1">
                                        <RiAccountCircleLine className='h-6 w-6' /> {user.userName}
                                    </Link>
                                </div>
                                <Link to="/wallet" onClick={toggleSidebar} className={`flex items-center text-xl hover:text-gray-200 dark:hover:text-gray-400 `}>
                                    <FaWallet className="mr-2" /> Wallet
                                </Link>
                                <Link to="/" onClick={toggleSidebar} className={`flex items-center text-xl hover:text-gray-200 dark:hover:text-gray-400 `}>
                                    <FaHome className="mr-2" /> Home
                                </Link>
                                <Link to="/expenses" onClick={toggleSidebar} className={`flex items-center text-xl hover:text-gray-200 dark:hover:text-gray-400 `}>
                                    <FaMoneyBillWave className="mr-2" /> Expenses
                                </Link>
                                <Link to="/budget" onClick={toggleSidebar} className={`flex items-center text-xl hover:text-gray-200 dark:hover:text-gray-400 `}>
                                    <FaRegChartBar className="mr-2" /> Budget
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <IoLogOutOutline size={35} title='Logout' className='hover:text-gray-400 dark:hover:text-red-600 cursor-pointer' onClick={logout} />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={toggleSidebar} className="w-full text-center border-2 py-2 rounded hover:bg-slate-500">Login</Link>
                                <Link to="/signup" onClick={toggleSidebar} className="w-full text-center border-2 py-2 rounded hover:bg-slate-500">Sign Up</Link>

                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
