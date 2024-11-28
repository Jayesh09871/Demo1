import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import Header from './Header';

export default function Learn() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentLevel, setCurrentLevel] = useState('basic'); // Default level is 'basic'
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      navigate('/login');
    } else {
      setLoggedInUser(username);
    }
  }, [navigate]);

  useEffect(() => {
    // Define the questions for each level (basic, intermediate, advanced)
    const levels = {
      basic: [
        { question: 'What is 2 + 2?', options: ['3', '4', '5'], correctAnswer: '4' },
        { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], correctAnswer: 'Paris' },
      ],
      intermediate: [
        { question: 'What is 5 + 3?', options: ['6', '7', '8'], correctAnswer: '8' },
        { question: 'What is the square root of 16?', options: ['2', '4', '8'], correctAnswer: '4' },
      ],
      advanced: [
        { question: 'What is 9 + 7?', options: ['15', '16', '17'], correctAnswer: '16' },
        { question: 'What is the square root of 81?', options: ['7', '9', '11'], correctAnswer: '9' },
      ],
    };

    // Set questions for the selected level
    setQuestions(levels[currentLevel] || []);
    setQuestionIndex(0); // Reset question index when level changes
    setUserAnswer(''); // Reset answer when changing levels
  }, [currentLevel]);

  const handleAnswer = () => {
    const correctAnswer = questions[questionIndex]?.correctAnswer;
    if (userAnswer === correctAnswer) {
      handleSuccess('Correct answer!');
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        handleSuccess(`You completed the ${currentLevel} level!`);
        // Optionally move to next level based on the current level
        if (currentLevel === 'basic') {
          setCurrentLevel('intermediate');
        } else if (currentLevel === 'intermediate') {
          setCurrentLevel('advanced');
        } else {
          handleSuccess('You have completed all levels!');
        }
      }
    } else {
      handleSuccess('Incorrect answer, try again!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header username={loggedInUser} handleLogout={handleLogout} />

      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800">Learn</h1>
          <p className="mt-4 text-lg text-center text-gray-600">Select a level to start learning.</p>

          {/* Level Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setCurrentLevel('basic')}
              className={`px-4 py-2 text-lg font-semibold rounded-lg shadow-md ${currentLevel === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-400'}`}
            >
              Basic
            </button>
            <button
              onClick={() => setCurrentLevel('intermediate')}
              className={`px-4 py-2 text-lg font-semibold rounded-lg shadow-md ${currentLevel === 'intermediate' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-400'}`}
            >
              Intermediate
            </button>
            <button
              onClick={() => setCurrentLevel('advanced')}
              className={`px-4 py-2 text-lg font-semibold rounded-lg shadow-md ${currentLevel === 'advanced' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-blue-400'}`}
            >
              Advanced
            </button>
          </div>

          {/* Display the current question for the selected level */}
          {questions.length > 0 ? (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
              <p className="text-xl font-semibold text-gray-800">{questions[questionIndex]?.question}</p>
              <div className="mt-4 space-y-3">
                {questions[questionIndex]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserAnswer(option)}
                    className={`block w-full p-3 text-left border rounded-lg ${
                      userAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAnswer}
                className="mt-6 w-full py-3 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-400"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <p className="mt-8 text-center text-gray-600">Loading questions...</p>
          )}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
