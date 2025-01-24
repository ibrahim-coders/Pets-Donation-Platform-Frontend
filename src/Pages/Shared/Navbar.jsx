import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import log from '../../assets/dog.webp';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [theme, setTheme] = useState('light');

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Sync theme on page load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={log} alt="Website Logo" className="h-10 rounded-full" />
      </div>

      <div className="flex justify-center text-center gap-2">
        <ul className="flex space-x-4 text-white py-1.5">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-gray-400' : 'hover:text-gray-400'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pet-listing"
              className={({ isActive }) =>
                isActive ? 'text-gray-400' : 'hover:text-gray-400'
              }
            >
              Pet Listing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation-campaigns"
              className={({ isActive }) =>
                isActive ? 'text-gray-400' : 'hover:text-gray-400'
              }
            >
              Donation Campaigns
            </NavLink>
          </li>

          <label
            htmlFor="AcceptConditions"
            className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
          >
            <input
              type="checkbox"
              id="AcceptConditions"
              className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
              <svg
                data-unchecked-icon
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>

              <svg
                data-checked-icon
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </label>
        </ul>

        {user && user?.email ? (
          <div className="relative">
            <img
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer ml-5"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dashboard
                </NavLink>

                {user && user?.email ? (
                  <NavLink
                    onClick={logout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </NavLink>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="btn bg-green-500 text-white ml-4">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
