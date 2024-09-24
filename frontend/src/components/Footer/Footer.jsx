import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      id="foot"
      className="bg-gradient-to-br from-red-800 to-brand-light dark:from-red-800 dark:to-brand-dark text-white p-4 z-20 mt-1"
    >
      <div className="flex flex-col md:flex-row flex-wrap justify-around px-2 sm:px-4">
        {/* About Us Section */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] max-w-xs mb-6 text-center md:text-left">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">About Us</h4>
          <p className="text-sm sm:text-base">Some description about the company.</p>
        </div>

        {/* Contact Us Section */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] max-w-xs mb-6 text-center md:text-left">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Contact Us</h4>
          <p className="text-sm sm:text-base">Email: info@example.com</p>
          <p className="text-sm sm:text-base">Phone: +123 456 7890</p>
        </div>

        {/* Made By Section */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] max-w-xs mb-6 text-center md:text-left">
          <div className="w-full flex items-center justify-center ">
            <h4 className="text-lg sm:text-xl font-semibold mb-2">Made By</h4>
          </div>
          <div className="flex flex-col px-2 md:items-start">
            <div className="flex flex-col items-center md:items-start">
              <ul className="flex flex-wrap justify-center md:justify-start">
                <li className="m-1 text-sm sm:text-base">Achyut Vyas</li>
                <li className="m-1 text-sm sm:text-base">Dev Saraf</li>
                <li className="m-1 text-sm sm:text-base">Divanshu Patil</li>
              </ul>
              <ul className="flex flex-wrap justify-center md:justify-start">
                <li className="m-1 text-sm sm:text-base">Harsh Jain</li>
                <li className="m-1 text-sm sm:text-base">Hitesh Patil</li>
                <li className="m-1 text-sm sm:text-base">Utsav Chandra</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Follow Us Section with Icons */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] max-w-xs mb-6 text-center md:text-left">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white text-xl sm:text-2xl hover:text-gray-400 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-white text-xl sm:text-2xl hover:text-gray-400 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white text-xl sm:text-2xl hover:text-gray-400 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white text-xl sm:text-2xl hover:text-gray-400 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-300 text-xs sm:text-sm mt-4">
        &copy; 2024 Event Management Portal NMIMS MPTP Shirpur.
      </div>
    </footer>
  );
};

export default Footer;
