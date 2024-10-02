import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const email = import.meta.env.VITE_EMAIL;

const Footer = () => {
  console.log("email", email);
  return (
    <footer
      id="foot"
      className="bg-gradient-to-br from-red-800 to-brand-light dark:from-red-800 dark:to-brand-dark text-white p-4 z-20 mt-1"
    >
      <div className="flex flex-col md:flex-row justify-between px-4 sm:px-8 lg:px-16">
        {/* About Us Section */}
        <div className="w-full md:w-1/2 max-w-96 mb-6 md:mb-0 text-center sm:text-left mx-auto sm:mx-0">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">About Us</h4>
          <p className="text-sm text-wrap max-w-96 sm:text-base text-justify">
            We are six NMIMS Shirpur students, guided by Director Sunita R.
            Patil and Prof. Piyush Kumar Soni. We created the Event Management
            Portal (EMP) to improve event planning, ensuring seamless
            documentation and enhancing event experiences for students and
            staff.
          </p>
        </div>

        {/* Made By Section */}
        <div className="w-full md:w-1/3 text-center mb-6 md:mb-0 md:ml-14">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Made By</h4>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col">
              <a
                href="https://www.linkedin.com/in/achyut-vyas-874184258/"
                className="text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Achyut Vyas
              </a>
              <a
                href="https://www.linkedin.com/in/dev-saraf-0248a4252/"
                className="text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dev Saraf
              </a>
              <a
                href="https://www.linkedin.com/in/divyanshu-patil-271430257/"
                className="text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Divyanshu Patil
              </a>
            </div>
            <div className="flex flex-col">
              <a
                href="https://www.linkedin.com/in/harsh-jain-b071b424a/"
                className="text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Harsh Jain
              </a>
              <a
                href="https://www.linkedin.com/in/hitesh-patil-49aa13265/"
                className="text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hitesh Patil
              </a>
              <a
                href="https://link-to-utsav.com"
                className="text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Utsav Chandra
              </a>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="w-full md:w-1/3 max-w-[350px] mb-6 text-center sm:text-left ml-auto sm:mx-0 md:mr-6">
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Contact Us</h4>
          <p className="text-sm sm:text-base">
            Email:{" "}
            <a href={`mailto:${email}`} className="text-white hover:underline">
              {email}
            </a>
          </p>

          {/* Follow Us Section */}
          <h4 className="text-lg sm:text-xl font-semibold mb-2 mt-4">
            Follow Us
          </h4>
          <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
            <a
              href="https://www.facebook.com/SHIRPUR.NMIMS/"
              aria-label="Facebook"
              className="text-white text-xl sm:text-2xl hover:text-[#3b5998] transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://www.youtube.com/@nmimsedu/videos"
              aria-label="YouTube"
              className="text-white text-xl sm:text-2xl hover:text-[#FF0000] transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.instagram.com/nmimsshirpurcampus/"
              aria-label="Instagram"
              className="text-white text-xl sm:text-2xl hover:text-[#C13584] transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com/school/nmims-engineering/posts/?feedView=all"
              aria-label="LinkedIn"
              className="text-white text-xl sm:text-2xl hover:text-[#0077B5] transition-transform transform hover:scale-110"
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
