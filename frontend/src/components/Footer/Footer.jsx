import React from "react";
import nmims from "./Shirpur-enhanced1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MobileFooter from "./mobilefooter";

const Footer = ({ userName }) => {
  const madeByNames = [
    {
      name: "Achyut Vyas",
      link: "https://www.linkedin.com/in/achyut-vyas-874184258/",
    },
    {
      name: "Utsav Chandra",
      link: "https://www.linkedin.com/in/utsav-chandra/",
    },
    {
      name: "Harsh Jain",
      link: "https://www.linkedin.com/in/harsh-jain-b071b424a/",
    },
    {
      name: "Divyanshu Patil",
      link: "https://www.linkedin.com/in/divyanshu-patil-271430257/",
    },
    {
      name: "Dev Saraf",
      link: "https://www.linkedin.com/in/dev-saraf-0248a4252/",
    },
    {
      name: "Hitesh Patil",
      link: "https://www.linkedin.com/in/hitesh-patil-49aa13265/",
    },
  ];

  const quickLinks = [
    { name: "Events", url: "/events" },
    { name: "Clubs", url: "/clubs" },
    { name: "Calendar", url: "/calendar" },
    { name: "History", url: "/history" },
  ];

  const openLocation = () => {
    window.open(
      "https://www.google.com/maps/place/Mukesh+Patel+Technology+Park,+Babulde,+Bank+of+Tapi+River,+National+Highway+No:+3,+Shirpur,+Pin+Code:+425405,+Dist.+Dhule,+Maharashtra,+India",
      "_blank"
    );
  };

  const openEmail = () => {
    window.open("mailto:emsmptp.shripur@nmims.edu", "_blank");
  };

  return (
    <>
      <div className="md:hidden">
        <MobileFooter />
      </div>

      <footer
        id="foot"
        className="hidden md:block bg-gradient-to-br from-red-800 to-brand-light dark:from-red-800 dark:to-brand-dark text-white p-4 z-0 mt-1"
      >
        <div className="flex flex-col md:flex-row justify-between px-4 sm:px-8 lg:px-16 space-y-8 md:space-y-0 footer-content z-0">
          <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-start z-0">
            <div className="flex items-start space-x-4 mb-4 z-0">
              <img
                src={nmims}
                alt="SVKM's NMIMS Logo"
                className="h-16 rounded-md z-0"
              />
              <div className="flex flex-col justify-start z-0">
                <h2 className="text-2xl font-semibold mb-1 z-0">
                  <span className="whitespace-nowrap">Event Management</span>
                  <br />
                  <span className="whitespace-nowrap">Portal</span>
                </h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pl-0 w-full z-0"
            >
              <div className="text-lg font-semibold mb-3 heading z-0">
                About Us
              </div>
              <p className="text-xs leading-relaxed mb-4 text-gray-100 max-w-2xl text-justify z-0">
                NMIMS Shirpur's Event Management Portal, guided by Director Dr.
                R. Sunita Patil and Prof. Piyush Kumar Soni, revolutionizes
                event coordination, empowering the academic community to
                effortlessly organize impactful events that elevate campus life
                and foster educational brilliance.
              </p>
            </motion.div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-1/5 mb-6 md:mb-0 text-center md:text-left ml-28 z-0">
            <h4 className="text-sm sm:text-base font-semibold mb-2 heading z-0">
              Quick Links
            </h4>
            <ul className="space-y-2 z-0">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ color: "#FFD700", scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="z-0"
                >
                  <Link to={link.url} className="text-xs transition-colors z-0">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Guided By Section */}
          <div className="w-full md:w-1/3 mb-6 text-left z-0">
            <h4 className="text-sm sm:text-base font-semibold mb-2 heading z-0">
              Guided By
            </h4>
            <div className="text-xs sm:text-sm z-0">
              <p>Prof. Piyush Kumar Soni</p>
              <p>Professor at MPSTME, Shirpur</p>
            </div>
          </div>

          {/* Made By Section */}
          <div className="w-full md:w-1/3 mb-6 text-left z-0">
            <h4 className="text-sm sm:text-base font-semibold mb-2 heading z-0">
              Made By
            </h4>
            <div className="grid grid-rows-6 gap-2 z-0">
              {madeByNames.map((person, index) => (
                <motion.div
                  key={index}
                  whileHover={{ color: "#FFD700", scale: 1.05 }}
                  className="text-xs sm:text-sm transition-colors z-0"
                >
                  <a
                    href={person.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {person.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Us and Follow Us Section */}
          <div className="w-full md:w-1/3 mb-6 text-left z-0">
            <h4 className="text-sm sm:text-base font-semibold mb-2 heading z-0">
              Contact Us
            </h4>
            <p className="text-sm sm:text-base z-0">
              <span className="flex items-center space-x-2" onClick={openEmail}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-white text-xs z-0"
                />
                <a
                  href="mailto:emsmptp.shripur@nmims.edu"
                  className="text-white hover:underline text-sm z-0"
                >
                  emsmptp.shripur@nmims.edu
                </a>
              </span>
            </p>
            <p className="text-xs sm:text-base z-0 mt-2">
              <span
                className="flex items-start space-x-2 cursor-pointer"
                onClick={openLocation}
              >
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-white text-xs z-0"
                />
                <span className="text-xs z-0">
                  Mukesh Patel Technology Park, Babulde, Bank of Tapi River,
                  National Highway No: 3, Shirpur, Pin Code: 425405, Dist.
                  Dhule, Maharashtra, India
                </span>
              </span>
            </p>

            <h4 className="text-sm sm:text-base font-semibold mb-2 mt-4 heading z-0">
              Follow Us
            </h4>
            <div className="flex justify-start space-x-3 sm:space-x-4 z-0 social-icons">
              <a
                href="https://www.facebook.com/SHIRPUR.NMIMS/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white text-xl sm:text-2xl hover:text-[#3b5998] transition-transform transform hover:scale-110 z-0"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://www.youtube.com/@nmimsedu/videos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white text-xl sm:text-2xl hover:text-[#FF0000] transition-transform transform hover:scale-110 z-0"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://www.linkedin.com/school/narsee-monjee-institute-of-management-studies/mycompany/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white text-xl sm:text-2xl hover:text-[#0077b5] transition-transform transform hover:scale-110 z-0"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href="https://www.instagram.com/nmimsshirpur_campus/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white text-xl sm:text-2xl hover:text-[#E1306C] transition-transform transform hover:scale-110 z-0"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center z-0"
        >
          <hr className="border-t border-gray-500 z-0" />
          <p className="text-xs text-gray-100 mt-3 copyright-text z-0">
            &copy; 2023 SVKM's NMIMS MPSTME Shirpur Campus. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
