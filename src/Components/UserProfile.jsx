import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { RiMenuAddLine } from 'react-icons/ri';

const UserProfile = ({ handleSidebarToggle }) => {
  const { user } = useAuth();
  return (
    <div className="w-full bg-gray-900 text-white flex justify-between items-center h-20 p-4">
      <div>
        <RiMenuAddLine
          onClick={handleSidebarToggle}
          className="text-4xl bg-orange-500 rounded-full p-1 md:hidden"
        />
      </div>
      <Link to="/dashboard/profile">
        <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />
      </Link>
    </div>
  );
};

export default UserProfile;
