import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import UserProfile from '../Components/UserProfile';
import Footer from '../Pages/Footer';

const DeshBoard = () => {
  return (
    <>
      {' '}
      <div className="flex flex-col lg:flex-row">
        {/* UserProfile at the top (full-width) */}

        <div className="flex flex-1">
          {/* Sidebar for larger screens */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 ">
            <UserProfile />
            <Outlet />
          </div>
        </div>
      </div>{' '}
      <Footer />
    </>
  );
};

export default DeshBoard;
