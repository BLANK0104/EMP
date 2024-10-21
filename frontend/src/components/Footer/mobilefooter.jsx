import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Nmims from "./Shirpur-enhanced1.png";

const MobileFooter = ({ userName }) => {
  const madeByNames = [
    {
      name: "Achyut Vyas",
      link: "https://www.linkedin.com/in/achyut-vyas-874184258/",
    },
    {
      name: "Dev Saraf",
      link: "https://www.linkedin.com/in/dev-saraf-0248a4252/",
    },
    {
      name: "Divyanshu Patil",
      link: "https://www.linkedin.com/in/divyanshu-patil-271430257/",
    },
    {
      name: "Harsh Jain",
      link: "https://www.linkedin.com/in/harsh-jain-b071b424a/",
    },
    {
      name: "Hitesh Patil",
      link: "https://www.linkedin.com/in/hitesh-patil-49aa13265/",
    },
    {
      name: "Utsav Chandra",
      link: "https://www.linkedin.com/in/utsav-chandra/",
    },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const openLocation = () => {
    window.open(
      "https://www.google.com/maps?q=Mukesh+Patel+Technology+Park,+Babulde,+Bank+of+Tapi+River,+National+Highway+No:3,+Shirpur,+425405,+Dhule,+Maharashtra,+India",
      "_blank"
    );
  };

  const openEmail = () => {
    window.open("mailto:emsmptp.shripur@nmims.edu", "_blank");
  };

  return (
    <footer className="bg-gradient-to-br from-red-800 to-brand-light dark:from-gray-800 dark:to-gray-900 text-white dark:text-gray-300 p-4 md:hidden">
      <div className="flex items-center mb-4">
        <img
          src={Nmims}
          alt="SVKM's NMIMS Logo"
          className="h-12 rounded-md mr-3"
        />
        <h2 className="text-xl font-semibold">
          Event Management
          <br />
          Portal
        </h2>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">About Us</h3>
        <p className="text-sm text-justify">
          NMIMS Shirpur's Event Management Portal, guided by Director Dr. R.
          Sunita Patil and Prof. Piyush Kumar Soni, revolutionizes event
          coordination, empowering the academic community to effortlessly
          organize impactful events that elevate campus life and foster
          educational brilliance.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-center">Quick Links</h3>
        <ul className="grid grid-cols-2 gap-2 pl-24">
          {[
            { name: "Events", url: "/events" },
            { name: "Clubs", url: "/clubs" },
            { name: "Calendar", url: "/calendar" },
            { name: "History", url: "/history" },
          ].map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ color: "#FFD700", scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={link.url} className="text-sm">
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col justify-start">
          <h3 className="text-lg font-semibold mb-2 text-center">Guided By</h3>
          <p className="text-sm pl-28">Prof. Piyush Kumar Soni</p>
          <p className="text-sm pl-24">Professor at MPSTME, Shirpur</p>
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-lg font-semibold mb-2 text-center">Contact Us</h3>
          <p className="text-sm">
            <span className="flex items-center space-x-2" onClick={openEmail}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-white text-xs pl-20"
              />
              <a
                href="mailto:emsmptp.shripur@nmims.edu"
                className="text-white hover:underline text-sm break-all"
              >
                emsmptp.shripur@nmims.edu
              </a>
            </span>
          </p>
          <p className="text-sm mt-2">
            <span
              className="flex items-start space-x-2 cursor-pointer"
              onClick={openLocation}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-white text-xs"
              />
              <span className="text-xs text-justify">
                Mukesh Patel Technology Park, Babulde, Bank of Tapi River,
                National Highway No: 3, Shirpur, Pin Code: 425405, Dist. Dhule,
                Maharashtra, India
              </span>
            </span>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-center">Made By</h3>
        <div className="pl-16 grid grid-cols-2 gap-2">
          {madeByNames.map((person, index) => (
            <motion.div
              key={index}
              whileHover={{ color: "#FFD700", scale: 1.05 }}
              className="text-sm"
            >
              <a href={person.link} className="hover:underline">
                {person.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-center">Follow Us</h3>
        <div className="flex justify-evenly">
          <a
            href="https://www.youtube.com/@nmimsedu/videos"
            aria-label="YouTube"
            className="text-[#FF0000] text-2xl"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a
            href="https://www.facebook.com/SHIRPUR.NMIMS/"
            aria-label="Facebook"
            className="text-[#4267B2] text-2xl"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="https://www.instagram.com/nmimsshirpurcampus/"
            aria-label="Instagram"
            className="text-[#E1306C] text-2xl"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/school/nmims-engineering/posts/?feedView=all"
            aria-label="LinkedIn"
            className="text-[#0077B5] text-2xl"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>

      <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />

      <div className="text-center text-sm">
        &copy; 2024 Event Management Portal NMIMS MPTP Shirpur.
      </div>
    </footer>
  );
};

export default MobileFooter;
