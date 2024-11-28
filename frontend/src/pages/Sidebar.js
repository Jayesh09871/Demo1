import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <nav className="flex flex-col p-4 space-y-4">
        {/* Sidebar links */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `block p-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
          }
        >
         home
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            `block p-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
          }
        >
         Learn
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block p-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `block p-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
          }
        >
          Shop
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;



