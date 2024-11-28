import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { handleSuccess } from "../utils";
import LeaderboardRow from "./LeaderboardRow";
import { Trophy } from "lucide-react";

// Mock data for demonstration
const mockLeaderboardData = [];

export default function Shop() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [quizScore, setQuizScore] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    const score = localStorage.getItem("quizScore");
    const language = localStorage.getItem("selectedLanguage");

    if (!username) {
      navigate("/login");
    } else {
      setLoggedInUser(username);
      setQuizScore(score ? parseInt(score) : null);
      setSelectedLanguage(language || "");

      // Combine mock data with user's data
      const userData = {
        username,
        score: score ? parseInt(score) : 0,
        language: language || "",
      };

      const allData = [...mockLeaderboardData, userData].sort(
        (a, b) => b.score - a.score
      );
      setLeaderboardData(allData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("quizScore");
    localStorage.removeItem("selectedLanguage");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <header
        className="ml-[16rem] border-b border-gray-500
 fixed bg-black text-white p-4 flex justify-between items-center shadow-md w-5/6 z-10 top-0 left-0"
      >
        <h1 className="text-xl font-bold ml-[2rem] text-green-500"></h1>
        <div className="flex items-center space-x-4">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-xl font-bold flex items-center gap-2 text-blue-500"
          >
            <Trophy className="w-6 h-6" />
          </motion.h1>
          <span className="text-xl font-bold text-green-500"></span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow p-8 space-y-8 mt-20 ml-[15rem]">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Global Leaderboard
          </h1>
          <p className="text-gray-400">
            Compete with the best quiz takers worldwide!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="table-auto w-full max-w-4xl mx-auto bg-gray-900/50 rounded-xl shadow-2xl backdrop-blur-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-gray-100">
                <th className="px-6 py-4 text-left rounded-tl-xl">Rank</th>
                <th className="px-[7rem] py-4 text-left">User</th>
                <th className="px-[7rem] py-4 text-left">Score</th>
                <th className="px-[7rem] py-4 text-left rounded-tr-xl">Language</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <LeaderboardRow
                  key={index}
                  rank={index + 1}
                  username={user.username}
                  score={user.score}
                  language={user.language}
                  isCurrentUser={user.username === loggedInUser}
                />
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>

      <ToastContainer />
    </div>
  );
}
