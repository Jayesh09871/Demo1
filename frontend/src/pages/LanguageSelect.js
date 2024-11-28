import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast

const LanguageSelect = () => {
  const [language, setLanguage] = useState("en"); // default to 'en'

  const navigate = useNavigate();

  // Load language from localStorage on component mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = async (selectedLanguage) => {
    setLanguage(selectedLanguage);

    // Save the selected language to localStorage
    localStorage.setItem("selectedLanguage", selectedLanguage);

    try {
      const token = localStorage.getItem("token");
      console.log("JWT Token:", token); // Debug the token
      const response = await axios.post(
        "https://backend-uuye.onrender.com/auth/language",
        { language: selectedLanguage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data); // Debug the full response

      if (response.data.success) {
        toast.success("Language updated successfully!");
        setTimeout(() => {
          navigate("/learn");
        }, 1000);
      } else {
        toast.error("Failed to update language.");
      }
    } catch (err) {
      console.error("Error updating language:", err);
      toast.error("Error updating language.");
    }
  };

  // Add a unique image URL for each language
  const languages = [
    {
      code: "Hindi",
      name: "Hindi",
      color: "#4ade80",
      image:
        "https://img.freepik.com/free-photo/india-republic-day-celebration-digital-art-with-flag_23-2151070781.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    },
    {
      code: "English",
      name: "English",
      color: "#f40103",
      image:
        "https://img.freepik.com/free-psd/american-flag_23-2150587468.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    },
    {
      code: "French",
      name: "French",
      color: "#0033cc",
      image:
        "https://img.freepik.com/free-photo/french-flag-white_144627-24628.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    },
    {
      code: "Spanish",
      name: "Spanish",
      color: "#ff9933",
      image:
        "https://img.freepik.com/free-photo/spanish-flag-white_144627-24632.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    },
    {
      code: "German",
      name: "German",
      color: "#ffcc00",
      image:
        "https://img.freepik.com/free-photo/wavy-flag-germany-texture-background-generative-ai_169016-29913.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    },
    {
      code: "Japanese",
      name: "Japanese",
      color: "#faf8fc",
      image:
        "https://img.freepik.com/free-photo/japan-national-flag-isolated-3d-white-background_1379-394.jpg?uid=R119405142&ga=GA1.1.1995806244.1728212278&semt=ais_hybrid",
    },
  ];

  return (
    <div className="justify-center items-center min-h-screen bg-gray-800 p-4">
      <h1
        className="text-3xl text-white mt-2 text-center font-bold animate-pulse 
               glow-text"
      >
        Which language do you Know ?
      </h1>

      <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="relative w-80 h-80 rounded-2xl flex justify-center items-center group transition-all duration-500 hover:w-96"
            >
              <div
                className="absolute w-full h-full rounded-2xl flex justify-center items-center"
                style={{ "--clr": lang.color }}
              >
                <div
                  className="w-full h-full bg-gray-900 rounded-full absolute transition-all duration-500 group-hover:w-full group-hover:h-full"
                  style={{
                    borderColor: lang.color,
                    borderWidth: "8px",
                    boxShadow: `0 0 10px ${lang.color}, 0 0 60px ${lang.color}`,
                  }}
                ></div>
                <div className="relative w-60 transition-all duration-500 group-hover:scale-0 group-hover:transition-delay-0s">
                  <img
                    src={lang.image}
                    alt={lang.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-5 py-3 rounded-lg">
                <h2 className="text-2xl text-gray-900 group-hover:text-yellow-500 transition-all duration-500 animate-pulse ">
                  {lang.name}
                </h2>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className="mt-4 px-6 py-2 text-white rounded-lg group-hover:ring-4 group-hover:ring-pink-400 group-hover:ring-opacity-50 transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-105"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer /> {/* Add the ToastContainer here */}
      </div>
    </div>
  );
};

export default LanguageSelect;

// selectedLanguage	en
