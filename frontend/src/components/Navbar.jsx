// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4 items-center">
        {!user ? (
          <>
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="bg-green-600 px-3 py-1 rounded hover:bg-red-700 text-white">
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
