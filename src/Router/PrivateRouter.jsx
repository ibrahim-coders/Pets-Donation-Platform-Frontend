import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loaders from '../Components/Loaders';

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // loading
  if (loading) {
    return <Loaders />;
  }

  // If the user is authenticated, render the children components
  if (user && user?.email) {
    return children;
  }

  // Redirect to the login page if the user is not authenticated
  return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRouter;
