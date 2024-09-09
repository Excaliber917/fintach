import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element: Component }) => {
  const { user } = useAuthContext(); // Get the current user from context

  return user ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute