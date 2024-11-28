import React from 'react';

const Header = ({ username, handleLogout }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold"></h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Welcome, {username}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
