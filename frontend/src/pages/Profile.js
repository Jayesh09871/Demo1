import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import Header from './Header';
export default function Profile() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      navigate('/login');
    } else {
      setLoggedInUser(username);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
    
<Header username={loggedInUser} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-4">This is your profile page.</p>
      </main>

      <ToastContainer />
    </div>
  );
}
