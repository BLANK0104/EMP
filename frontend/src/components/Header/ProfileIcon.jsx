import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../../pages/Logout/Logout";

const ProfileIcon = ({ profileMenuVisible, toggleProfileMenu, image }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (image) {
      setImageUrl(`/Club_logo/${image}.jpg`);
    }
  }, [image]);

  return (
    <div className="relative">
      <button
        id="profileButton"
        className="flex items-center focus:outline-none"
        onClick={toggleProfileMenu} // Use the toggle function passed as a prop
      >
        <img
          src={imageUrl}
          alt="User Avatar"
          className="rounded-full w-6 h-6 sm:w-6 sm:h-6"
        />
      </button>
      {profileMenuVisible && (
        <div
          id="profileMenu"
          className="absolute right-0 mt-2 w-32 md:w-36 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg overflow-hidden z-30"
        >
          <Link
            to="/settings"
            className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-center w-full"
          >
            Settings
          </Link>
          <div className="block px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-left">
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;