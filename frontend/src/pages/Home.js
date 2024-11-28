import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Header from './Header';
import Sidebar from './Sidebar';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      handleError('Unauthorized access. Redirecting to login.');
      navigate('/login');
    }
    setLoggedInUser(username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        
        <Header username={loggedInUser} handleLogout={handleLogout} />

        <main className="p-6">
          <h2 className="text-2xl font-semibold">home Content</h2>
          <p className="mt-4 text-gray-600">Welcome to your home, {loggedInUser}!</p>
        </main>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
