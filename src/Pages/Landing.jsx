import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Components/ThemeContect";

//icon(s)
import { FaCircleChevronRight } from "react-icons/fa6";

//image(s)
import Bible from "../../public/Bible.png";
import Jesus from "../../public/Jesus.svg";

//Component(s)
import LoadingScreen from "../Components/LoadingScreen";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading");
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setLoadingText((prev) => {
        const dots = prev.split(".").length - 1;
        return dots < 3 ? `${prev}.` : "Loading";
      });
    }, 500);

    const loadingTimer = setTimeout(() => {
      clearInterval(dotsInterval);
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(dotsInterval);
    };
  }, []);

  const handleClick = () => {
    navigate("/page-2");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LoadingScreen image="./Bible.png" altText="Loading..." />
        <p className="relative top-[10rem] text-customGold z-10 mt-4 text-lg font-bold">
          {loadingText}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-8 px-6 bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center space-y-12 w-full max-w-md mt-16">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-6">
          <img 
            src="./Jesus.svg" 
            alt="jesus-icon" 
            className="w-96 h-96 animate-pulse" 
            loading="lazy" 
          />
          <h1 className="font-Inria font-bold text-4xl text-customGold text-center">
            CHRISTVILLE
          </h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-6">
          <p className="font-Poppins text-xl text-gray-800 leading-relaxed">
            Your Digital Sanctuary for Spiritual Growth
          </p>
          <p className="font-Poppins text-base text-gray-600 leading-relaxed">
            Discover daily inspiration, connect with fellow believers, and deepen your faith journey through scripture, prayer, and community.
          </p>
        </div>

        {/* Enter Button */}
        <button
          className="mt-12 p-4 rounded-full bg-customGold/10 hover:bg-customGold/20 transition-all duration-300"
          onClick={handleClick}
        >
          <FaCircleChevronRight className="text-5xl text-customGold" />
        </button>
      </div>

      {/* Social Media Section */}
      <div className="w-full max-w-md space-y-4 mb-8">
        <p className="font-Poppins text-center text-gray-500">
          Join our community
        </p>
        <div className="flex justify-center space-x-6">
          <Link to="#" className="hover:opacity-80 transition-opacity">
            <img 
              src="/instagram.png" 
              alt="instagram" 
              className="w-8 h-8"
            />
          </Link>
          <Link to="#" className="hover:opacity-80 transition-opacity">
            <img 
              src="/youtube.png" 
              alt="youtube" 
              className="w-8 h-8"
            />
          </Link>
          <Link to="#" className="hover:opacity-80 transition-opacity">
            <img 
              src="/twitter.png" 
              alt="x" 
              className="w-8 h-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
