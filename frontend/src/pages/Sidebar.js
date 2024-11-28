import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const iconSrc =
    "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg";
  const iconSrc2 =
    "https://cdn0.iconfinder.com/data/icons/20-flat-icons/128/user.png";
  const iconSrc3 =
    "https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg";

  return (
    <div className="h-screen w-64 bg-black text-white fixed border-r border-gray-500">
      <nav className="flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src="https://storage.googleapis.com/a1aa/image/fkBnqso0SqX5BSLn7gsARWoraL89LXe9We2fActiIeV1I7reE.jpg"
              className="w-full h-full "
            />
          </div>
        </div>
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-md ${
              isActive
                ? "text-green-400 font-bold border border-blue-500 text-white"
                : "hover:bg-gray-600 font-bold"
            }`
          }
        >
          <img src={iconSrc} alt="icon" className="w-5 h-5" />
          <span>LEARN</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-md ${
              isActive
                ? "text-green-400 font-bold border border-blue-500 text-white"
                : "hover:bg-gray-600 font-bold"
            }`
          }
        >
          <img src={iconSrc2} alt="icon" className="w-5 h-5" />
          <span>PROFILE</span>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-md ${
              isActive
                ? "text-green-400 font-bold border border-blue-500 text-white"
                : "hover:bg-gray-600 font-bold"
            }`
          }
        >
          <img src={iconSrc3} alt="icon" className="w-5 h-5" />
          <span>LEADERBOARD</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
