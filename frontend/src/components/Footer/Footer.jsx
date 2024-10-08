import React from "react";
import nmims from "./Shirpur-enhanced1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const Footer = ({ userName }) => {
  const madeByNames = [
    { name: "Achyut Vyas", link: "https://www.linkedin.com/in/achyut-vyas-874184258/" },
    { name: "Dev Saraf", link: "https://www.linkedin.com/in/dev-saraf-0248a4252/" },
    { name: "Divyanshu Patil", link: "https://www.linkedin.com/in/divyanshu-patil-271430257/" },
    { name: "Harsh Jain", link: "https://www.linkedin.com/in/harsh-jain-b071b424a/" },
    { name: "Hitesh Patil", link: "https://www.linkedin.com/in/hitesh-patil-49aa13265/" },
    { name: "Utsav Chandra", link: "https://www.linkedin.com/in/utsav-chandra/" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <footer
      id="foot"
      className="bg-gradient-to-br from-red-800 to-brand-light dark:from-red-800 dark:to-brand-dark text-white p-4 z-20 mt-1"
    >
      <div className="flex flex-col md:flex-row justify-between px-4 sm:px-8 lg:px-16 space-y-8 md:space-y-0">
        {/* Logo and Event Management Portal Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex items-start space-x-4">
        <img
          src={nmims}
          alt="SVKM's NMIMS Logo"
          className="h-16 rounded-md" 
        />
        <div className="flex flex-col justify-start align-middle">
          <h2 className="text-2xl font-semibold mb-1">
            <span className="whitespace-nowrap">Event Management</span>
            <br />
            <span className="whitespace-nowrap">Portal</span>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-lg font-semibold mb-4 heading">About Us</div>
            <p className="text-xs leading-snug mb-4">
              We are six NMIMS Shirpur students, guided by Director Sunita R. Patil and Prof. Piyush Kumar Soni. We created the Event Management Portal (EMP) to improve event planning, ensuring seamless documentation and enhancing event experiences for students and staff.
            </p>
          </motion.div>
        </div>
      </div>

        {/* Quick Links Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left ml-28">
          <h4 className="text-sm sm:text-base font-semibold mb-2 heading">Quick Links</h4>
          <ul className="space-y-2">
            {["Events", "Clubs", "Calendar", "History"].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ color: "#FFD700", scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* <a href={/${link.toLowerCase()}} className="text-xs transition-colors">
                  {link}
                </a> */}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Made By Section */}
        <div className="w-full md:w-1/3 mb-6 text-left">
          <h4 className="text-sm sm:text-base font-semibold mb-2 heading">Made By</h4>
          <div className="grid grid-rows-6 gap-2">
            {madeByNames.map((person, index) => (
              <motion.div
                key={index}
                whileHover={{ color: "#FFD700", scale: 1.05 }}
                className="text-xs sm:text-sm transition-colors"
              >
                <a href={person.link} className="hover:underline">
                  {person.name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Us and Follow Us Section */}
        <div className="w-full md:w-1/3 mb-6 text-left">
          <h4 className="text-sm sm:text-base font-semibold mb-2 heading">Contact Us</h4>
          <p className="text-xs sm:text-base">
            Email: <a href="mailto:emsmptp.shripur@nmims.edu" className="text-white hover:underline">emsmptp.shripur@nmims.edu</a>
          </p>

          <h4 className="text-sm sm:text-base font-semibold mb-2 mt-4 heading">Follow Us</h4>
          <div className="flex justify-start space-x-3 sm:space-x-4">
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

      {/* Line above copyright */}
      <hr className="border-t border-gray-400 my-4 mx-auto w-full md:w-2/3" />

      {/* Copyright Section */}
      <div className="text-center text-gray-300 text-xs sm:text-sm mt-4">
        &copy; 2024 Event Management Portal NMIMS MPTP Shirpur.
      </div>

      {/* Additional styling */}
      <style jsx>{`
        .heading {
          position: relative;
        }

        .heading::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 25px;
          height: 2px;
          background-color: white;
          transition: width 0.3s ease;
        }

        /*Animation endpoint */
        .heading:hover::after {
          width: 70px;
        }

        hr {
          border: 0;
          height: 1px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
        }
      `}</style>
    </footer>
  );
};

export default Footer;