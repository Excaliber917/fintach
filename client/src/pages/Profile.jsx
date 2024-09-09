import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaSave, FaSignOutAlt, FaEnvelope, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import Nprogress from 'nprogress'

function Profile() {
  const { user } = useAuthContext(); // Fetch current user data from context
  const { loading, updateUser } = useUpdateUser();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',

  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        userName: user.userName,
        email: user.email,
        password: '', // Keep the password empty, fill if the user wants to change it
       
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser(formData); // Perform the update logic here
    }
    setIsEditing(!isEditing);
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

  const { logout } = useLogout();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700">

      {/* Contact Us Card */}
      <div className="p-4 max-w-sm mx-auto mb-6">
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:bg-blue-700 transition duration-300 ease-in-out">
          <FaPhoneAlt className="text-3xl" />
          <div>
            <h3 className="text-xl font-bold">Need Help?</h3>
            <Link
              to="/contact"
              className="text-sm hover:underline focus:outline-none"
            >
              You can contact us anytime!
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`pl-10 pr-4 py-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 ${isEditing ? 'border-blue-500' : 'border-gray-300'
                  }`}
                placeholder="Name"
              />
            </div>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`pl-10 pr-4 py-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 ${isEditing ? 'border-blue-500' : 'border-gray-300'
                  }`}
                placeholder="Username"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`pl-10 pr-4 py-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 ${isEditing ? 'border-blue-500' : 'border-gray-300'
                  }`}
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <MdPassword className="absolute top-3 left-3 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className={`pl-10 pr-4 py-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 ${isEditing ? 'border-blue-500' : 'border-gray-300'
                  }`}
                placeholder="Enter new password if you want to change"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-white ${isEditing
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-800`}
              >
                {isEditing ? (
                  <>
                    <FaSave /> <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <FaUserEdit /> <span>Edit Profile</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-800"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
