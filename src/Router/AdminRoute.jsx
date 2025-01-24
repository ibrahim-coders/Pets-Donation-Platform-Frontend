import { Navigate } from 'react-router-dom';

import useAdmin from '../hooks/useAdmin';
import Loaders from '../Components/Loaders';

const AdminRoute = ({ children }) => {
  const [isAdmin, isLoading] = useAdmin();

  // loading
  if (isLoading) {
    return <Loaders />;
  }

  // If the user is authenticated, render the children components
  if (isAdmin) {
    return children;
  }

  return <Navigate to="/dashboard/add-pet" />;
};

export default AdminRoute;
