import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div className="w-full bg-gray-900 text-white flex justify-end h-20 p-4">
      <Link to="/dashboard/profile">
        <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />
      </Link>
    </div>
  );
};

export default UserProfile;
