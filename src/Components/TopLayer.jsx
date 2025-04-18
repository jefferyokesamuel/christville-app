import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../Usercontext";

//Icon(s)
import { CoinIcon } from "../Icons/Icons";

const TopLayer = ({ userId }) => {
  const location = useLocation();
  const [profilePic, setProfilePic] = useState(null);
  const isFaithPage = location.pathname.startsWith("/app/page-2");
  const { daysSinceJoin } = useUserContext();

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://your-backend-url.com/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setProfilePic(userData.photo_url);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="flex flex-col w-full pt-[50px] gap-4">
      {/* Top section with date and profile */}
      <div className="flex items-center justify-between w-full px-4">
        <span className="text-gray-600 font-medium">Today</span>
        <div className="flex items-center gap-2">
          {profilePic ? (
            <img
              src={profilePic}
              alt="User Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-300"></div>
          )}
        </div>
      </div>

      {/* Bottom section with navigation and coins */}
      <div className="flex items-center justify-between w-full px-4">
        {isFaithPage ? (
          <div className="flex gap-6">
            <NavLink
              to="/app/page-2/games"
              className={({ isActive }) =>
                `text-gray-600 font-medium ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              Games
            </NavLink>
            <NavLink
              to="/app/page-2/prayer-wall"
              className={({ isActive }) =>
                `text-gray-600 font-medium ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              Prayer Wall
            </NavLink>
          </div>
        ) : (
          <h3 className="text-gray-600 font-medium">Daily verse</h3>
        )}
        
        {/* Coins display */}
        <div className="flex items-center gap-2">
          <CoinIcon />
          <span className="font-bold text-[20px] text-customGold">{daysSinceJoin}</span>
        </div>
      </div>
    </div>
  );
};

export default TopLayer;
