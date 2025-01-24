import { FaDonate, FaUsers } from 'react-icons/fa';

import { GiAnimalSkull } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const Admin = () => {
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'flex items-center gap-3  p-3 text-yellow-500 bg-gray-800 rounded-md'
      : 'flex items-center gap-3 p-3 text-gray-300 hover:text-yellow-500 hover:bg-gray-700 rounded-md';
  return (
    <div className="gap-2">
      {/* Admin-specific links */}

      <NavLink to="/dashboard/users" className={navLinkStyles}>
        <FaUsers /> Manage Users
      </NavLink>
      <NavLink to="/dashboard/all-pets" className={navLinkStyles}>
        <GiAnimalSkull /> Manage Pets
      </NavLink>
      <NavLink to="/dashboard/all-donations" className={navLinkStyles}>
        <FaDonate /> Manage Donations
      </NavLink>
    </div>
  );
};

export default Admin;
