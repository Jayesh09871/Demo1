import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleSuccess } from "../utils";
import Sidebar from "./Sidebar";
import { Edit } from "react-feather";

const Profile = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("selectedImage") ||
      "https://img.freepik.com/free-psd/3d-illustration-with-online-avatar_23-2151303048.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languageFlag, setLanguageFlag] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const navigate = useNavigate();

  const languageFlags = {
    English: "https://img.freepik.com/free-psd/american-flag_23-2150587468.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    Hindi: "https://img.freepik.com/free-photo/india-republic-day-celebration-digital-art-with-flag_23-2151070781.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    // Add more flags as needed...
  };

  const sharableLink = "https://demo1-0zpe.onrender.com/profile";

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (!username) {
      navigate("/login");
    } else {
      setLoggedInUser(username);
    }

    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setLanguageFlag(languageFlags[storedLanguage]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleImageChange = (img) => {
    setSelectedImage(img);
    localStorage.setItem("selectedImage", img);
    setIsModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharableLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="ml-[16rem] border-b border-gray-500 fixed bg-black text-white p-4 flex justify-between items-center shadow-md w-5/6 z-10 top-0 left-0">
          <h1 className="text-xl font-bold ml-[2rem] text-green-500">Profile</h1>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-green-500">Welcome, {loggedInUser}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Profile Content */}
        <main className="p-8 mt-16 overflow-y-auto">
          <div className="bg-red-600 rounded-lg p-4 mx-auto relative w-fit">
            <img
              src={selectedImage}
              alt="Profile placeholder"
              className="w-80 h-80 rounded-lg"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-1 right-2 bg-gray-700 p-1 rounded-full shadow hover:bg-gray-600"
            >
              <Edit className="w-5 h-4 text-red-500" />
            </button>
          </div>

          {/* Image Selection Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Select a new profile image</h3>
                <div className="flex space-x-4">
                  {/* Add image options dynamically if needed */}
                </div>
                <p
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </p>
              </div>
            </div>
          )}





          {/* Invite Friends Section */}
          <div className="bg-gray-900 p-4 rounded-lg shadow mt-4 border border-gray-700">
            <h2 className="text-xl font-bold">Invite Friends</h2>
            <p
              onClick={() => setInviteModalOpen(true)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Invite Friends
            </p>
          </div>

          {/* Invite Modal */}
          {inviteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg text-black">
                <h3 className="text-lg font-bold mb-4">Invite Your Friends</h3>
                <p className="mb-4">{sharableLink}</p>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-4"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default Profile;
