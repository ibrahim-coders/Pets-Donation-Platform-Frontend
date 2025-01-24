import { NavLink } from 'react-router-dom';
import {
  FaPaw,
  FaPlus,
  FaClipboardList,
  FaDonate,
  FaHandHoldingHeart,
  FaListUl,
} from 'react-icons/fa';
import { CiHome } from 'react-icons/ci';

import Admin from '../Pages/DonteCampaigns/Admin/Admin';
import useAdmin from '../hooks/useAdmin';

const Sidebar = () => {
  const [isAdmin] = useAdmin();

  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'flex items-center gap-3 p-2 text-yellow-500 bg-gray-800 rounded-md'
      : 'flex items-center gap-3 p-2 text-gray-300 hover:text-yellow-500 hover:bg-gray-700 rounded-md';

  return (
    <div className="h-full w-64 bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Pet Management</h1>
      <nav className="flex flex-col gap-4">
        {/* User-specific links */}
        <NavLink to="/dashboard/add-pet" className={navLinkStyles}>
          <FaPaw /> Add a Pet
        </NavLink>
        <NavLink to="/dashboard/my-added-pets" className={navLinkStyles}>
          <FaListUl /> My Added Pets
        </NavLink>
        <NavLink to="/dashboard/adoption-requests" className={navLinkStyles}>
          <FaClipboardList /> Adoption Requests
        </NavLink>
        <NavLink to="/dashboard/create-donation" className={navLinkStyles}>
          <FaPlus /> Create Donation Campaign
        </NavLink>
        <NavLink
          to="/dashboard/my-donation-campaigns"
          className={navLinkStyles}
        >
          <FaDonate /> My Donation Campaigns
        </NavLink>
        <NavLink to="/dashboard/my-donations" className={navLinkStyles}>
          <FaHandHoldingHeart /> My Donations
        </NavLink>
        {isAdmin && <Admin></Admin>}

        {/* Divider and Home link */}

        <NavLink to="/" className={navLinkStyles}>
          <CiHome /> Home
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
