import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="text-yellow-400 w-6 h-6" />;
    case 2:
      return <Medal className="text-gray-400 w-6 h-6" />;
    case 3:
      return <Award className="text-amber-700 w-6 h-6" />;
    default:
      return null;
  }
};

export default function LeaderboardRow({ rank, username, score, language, isCurrentUser }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.1 }}
      className={`${
        isCurrentUser ? 'bg-blue-900/30' : 'hover:bg-gray-700'
      } transition-all cursor-pointer`}
    >
      <td className="border-b border-gray-600 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-200">{rank}</span>
          {getRankIcon(rank)}
        </div>
      </td>
      <td className="border-b border-gray-600 px-6 py-4">
        <span className={isCurrentUser ? 'text-blue-400 font-semibold' : ''}>
          {username}
        </span>
      </td>
      <td className="border-b border-gray-600 px-6 py-4">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full"
        >
          {score}
        </motion.div>
      </td>
      <td className="border-b border-gray-600 px-6 py-4">
        <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
          {language}
        </span>
      </td>
    </motion.tr>
  );
}
