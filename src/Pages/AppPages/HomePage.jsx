import React, { useState } from "react";
import TopLayer from "../../Components/TopLayer";
import { useTheme } from "../../Components/ThemeContect";
import { FaHeart } from "react-icons/fa6";
import { MdBookmarks } from "react-icons/md";
import { SendIcon } from "../../Icons/Icons";

const HomePage = () => {
  const [bibleVerse, setBibleVerse] = useState(null); // State to store the verse
  const [imageSrc, setImageSrc] = useState("/Bible2.png");
  const [likes, setLikes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? "#ffffff" : "#FFFFFF";

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://vivablockchainconsulting.xyz";

  const fetchBibleVerse = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/daily-verse`); // Backend URL changed in the env folder
      console.log("Response:", response);
      if (!response.ok) {
        const errorText = await response.text(); // Capture any server error message
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setBibleVerse(data); // Store the fetched Bible verse
      setImageSrc("/open bible.png"); // Change image after click
    } catch (error) {
      console.error("Error fetching Bible verse:", error);
    }
  };

  const toggleLike = () => {
    setLikes((prevLikes) => prevLikes + 1); // Increment likes
  };

  const toggleBookmark = () => {
    setBookmarked((prevBookmarked) => !prevBookmarked); // Toggle bookmark state
  };

  const shareMessage = () => {
    if (bibleVerse) {
      const message = `Verse of the Day: ${bibleVerse.reference} - "${bibleVerse.text}"`;
      // Share API for mobile or fallback for desktop
      if (navigator.share) {
        navigator
          .share({
            title: "Bible Verse",
            text: message,
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        console.log("Fallback sharing:", message);
        alert(`Share this verse:\n${message}`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-Poppins px-6">
      <TopLayer />
      <section className="flex flex-col items-center gap-6 mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Tap to read</h3>
        <button 
          onTouchStart={fetchBibleVerse} 
          onClick={fetchBibleVerse}
          className="transform transition-transform hover:scale-105 active:scale-95"
        >
          <img 
            src={imageSrc} 
            alt="Bible" 
            className="w-80 h-48 object-contain cursor-pointer" 
          />
        </button>
        
        {/* Display the Bible verse */}
        {bibleVerse && (
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mt-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Verse of the day</h3>
              <h4 className="text-lg font-medium text-blue-600">{bibleVerse.reference}</h4>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-800 text-lg italic leading-relaxed text-center">
                "{bibleVerse.text}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <section className="flex items-center space-x-6">
                {/* Like Button */}
                <button 
                  onClick={toggleLike}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaHeart
                    style={{
                      color: likes ? "#EF4444" : "#9CA3AF",
                      fontSize: "24px",
                    }}
                  />
                </button>

                {/* Share Button */}
                <button 
                  onClick={shareMessage}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <SendIcon />
                </button>
              </section>

              {/* Bookmark Button */}
              <button 
                onClick={toggleBookmark}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MdBookmarks
                  style={{
                    color: bookmarked ? "#F59E0B" : "#9CA3AF",
                    fontSize: "24px",
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
