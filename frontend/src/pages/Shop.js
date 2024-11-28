import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import Header from './Header';

export default function Leaderboard() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [quizScore, setQuizScore] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    const score = localStorage.getItem('quizScore');
    const language = localStorage.getItem('selectedLanguage');

    if (!username) {
      navigate('/login');
    } else {
      setLoggedInUser(username);
      setQuizScore(score);
      setSelectedLanguage(language);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('quizScore');
    localStorage.removeItem('selectedLanguage');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-800 text-white">
      <Header username={loggedInUser} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-grow p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-100">Leaderboard</h1>
          <p className="text-lg text-gray-300">See how you compare with others!</p>
        </div>

        {/* Table for Leaderboard */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full sm:w-3/4 md:w-1/2 mx-auto bg-gray-900 rounded-lg shadow-xl">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-gray-100">
                <th className="px-6 py-3 text-left">Rank</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Score</th>
                <th className="px-6 py-3 text-left">Language</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700 transition-all">
                <td className="border-b border-gray-600 px-6 py-4 text-gray-200">1</td>
                <td className="border-b border-gray-600 px-6 py-4">{loggedInUser}</td>
                <td className="border-b border-gray-600 px-6 py-4">{quizScore}</td>
                <td className="border-b border-gray-600 px-6 py-4">{selectedLanguage}</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
