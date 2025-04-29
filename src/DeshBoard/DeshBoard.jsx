import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import UserProfile from '../Components/UserProfile';
import Footer from '../Pages/Footer';
import { useState } from 'react';

const Dashboard = () => {
  const [isOpen, setOpen] = useState(false);
  const handleSidebarToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Main Content Wrapper */}
        <div className="flex flex-1 relative">
          {/* Sidebar for large screens */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Sidebar Toggle for Mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={handleSidebarToggle}
            ></div>
          )}

          <div
            className={`absolute top-0 left-0 z-50 transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:hidden`}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <UserProfile handleSidebarToggle={handleSidebarToggle} />
            <div className="w-96 px-2 sm:w-full ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
