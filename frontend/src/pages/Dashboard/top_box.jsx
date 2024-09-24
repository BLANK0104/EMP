import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const TopBox = ({ accepted, rejected, modified, role, currentStatus }) => {
  return (
    <div className="w-full p-4 bg-blue-200 dark:bg-blue-800 rounded-lg"> 
      <div className="flex flex-col items-start w-full">
        <div className="text-gray-900 dark:text-white text-5xl mb-4">Hi there, {role}</div>
        <div className="text-gray-900 dark:text-white text-2xl mb-4">Current Status: {currentStatus}</div> 
        <div className="flex flex-col md:flex-row w-full">
          <div className="bg-green-500 text-white p-4 m-1 flex-1 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 relative">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-white" />
              <h3 className="text-lg font-bold">Accepted</h3>
            </div>
            <p>{accepted}</p>
          </div>
          <div className="bg-red-500 dark:bg-red-600 text-white p-4 m-1 flex-1 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 relative">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-white" />
              <h3 className="text-lg font-bold">Rejected</h3>
            </div>
            <p>{rejected}</p>
          </div>
          <div className="bg-orange-500 text-white p-4 m-1 flex-1 rounded-lg hover:bg-orange-700 dark:hover:bg-orange-800 relative">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEdit} className="mr-2 text-white" />
              <h3 className="text-lg font-bold">Modified</h3>
            </div>
            <p>{modified}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBox;