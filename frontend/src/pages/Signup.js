import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const url = `http://localhost:3005/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-[390px] h-[490px] bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700">
        {/* Animated background gradients */}
        <div className="absolute top-[-50%] left-[-50%] w-[390px] h-[490px] bg-gradient-to-br from-transparent via-cyan-400 to-cyan-400 animate-spin-slow origin-bottom-right"></div>
        <div className="absolute top-[-50%] left-[-50%] w-[390px] h-[490px] bg-gradient-to-br from-transparent via-pink-500 to-pink-500 animate-spin-slow origin-bottom-right delay-[3s]"></div>

        {/* Form */}
        <form className="relative z-10 p-8 bg-gray-900 rounded-lg" onSubmit={handleSignup}>
          <h2 className="text-2xl font-semibold text-cyan-400 text-center tracking-wider">Signup</h2>

          {/* Name Input */}
          <div className="relative mt-8">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={signupInfo.name}
              onChange={handleChange}
              className="w-full px-4 pt-4 pb-2 text-sm text-white bg-transparent border-b-2 border-gray-600 outline-none focus:border-cyan-400 focus:ring-0 peer"
            />
            <label
              htmlFor="name"
              className="absolute top-2 left-4 text-sm text-gray-400 transition-all duration-300 transform -translate-y-4 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-cyan-400 focus:bg-transparent"
            >
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mt-6">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={signupInfo.email}
              onChange={handleChange}
              className="w-full px-4 pt-4 pb-2 text-sm text-white bg-transparent border-b-2 border-gray-600 outline-none focus:border-cyan-400 focus:ring-0 peer"
            />
            <label
              htmlFor="email"
              className="absolute top-2 left-4 text-sm text-gray-400 transition-all duration-300 transform -translate-y-4 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-cyan-400"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mt-6">
            <input
              type="password"
              name="password"
              placeholder=" "
              value={signupInfo.password}
              onChange={handleChange}
              className="w-full px-4 pt-4 pb-2 text-sm text-white bg-transparent border-b-2 border-gray-600 outline-none focus:border-cyan-400 focus:ring-0 peer"
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-4 text-sm text-gray-400 transition-all duration-300 transform -translate-y-4 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-cyan-400"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-8 text-sm font-bold text-center text-white bg-cyan-400 rounded hover:bg-cyan-500"
          >
            Signup
          </button>

          <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
