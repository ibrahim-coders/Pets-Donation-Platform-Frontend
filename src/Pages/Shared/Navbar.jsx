import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import log from '../../assets/dog.webp';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState('light-mode');
  useEffect(() => {
    document.querySelector('body').className = theme;
  }, [theme]);

  const changeTheme = () => {
    if (theme === 'light-mode') {
      setTheme('dark-mode');
    } else {
      setTheme('light-mode');
    }
  };
  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className=" shadow-md p-4 md:px-8 flex justify-between items-center sticky top-0 z-10 border-b">
      {/* Logo */}
      <div className="flex items-center w-16 h-16 bg-gray-800 rounded-full p-2">
        <img src={log} alt="Logo" className="h-12 w-12 rounded-full" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'bg-yellow-500 font-bold border-b-2 rounded-lg p-2 transition duration-300 ease-in-out'
                : 'hover:text-orange-600'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pet-listing"
            className={({ isActive }) =>
              isActive
                ? 'bg-yellow-500 font-bold border-b-2 rounded-lg p-2 transition duration-300 ease-in-out'
                : 'hover:text-orange-600'
            }
          >
            Pet Listing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/donation-campaigns"
            className={({ isActive }) =>
              isActive
                ? 'bg-yellow-500 font-bold border-b-2 rounded-lg p-2 transition duration-300 ease-in-out'
                : 'hover:text-orange-600'
            }
          >
            Donation Campaigns
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'bg-yellow-500 font-bold border-b-2 rounded-lg p-2 transition duration-300 ease-in-out'
                : 'hover:text-orange-600'
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-4 items-center">
        {/* Mobile Menu Toggle */}
        <div className="flex gap-4">
          {/* Theme Toggle */}
          <div className="items-center" onClick={changeTheme}>
            {theme === 'light-mode' ? (
              <IoMoon className="text-2xl cursor-pointer " />
            ) : (
              <IoMoonOutline className="text-2xl cursor-pointer" />
            )}
          </div>
          <button className="md:hidden text-2xl" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {/* User Dropdown */}
        {user?.email ? (
          <div className="relative hidden md:block">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-2">
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className="hidden md:inline-block bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <NavLink
                to="/"
                className="bg-yellow-500 font-bold border-b-2 rounded-lg p-2 transition duration-300 ease-in-out hover:text-orange-500 w-full"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pet-listing"
                className="block py-2 text-gray-800 hover:text-black"
                onClick={toggleMenu}
              >
                Pet Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donation-campaigns"
                className="block py-2 text-gray-800 hover:text-black"
                onClick={toggleMenu}
              >
                Donation Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="block py-2 text-gray-800 hover:text-black"
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="flex flex-col items-center ">
            {/* Mobile User Dropdown */}
            {user?.email ? (
              <div className="text-center">
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="block text-center bg-green-500 text-white px-4 py-2 rounded-md mt-2 mb-6"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
