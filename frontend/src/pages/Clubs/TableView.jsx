import React from 'react';

const TableView = ({ data }) => {
  return (
    <div className="mt-8 w-full max-w-5xl overflow-x-auto">
      {data.length > 0 && (
        <div className="w-full h-full overflow-x-auto overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {data.map((member, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <img src={member.photo} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Our Objectives</h2>
          <ul className="list-disc list-inside mb-8">
            {data.map((member, index) => (
              member.objectives && <li key={index} className="text-gray-600 dark:text-gray-400">{member.objectives}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Our Outcomes</h2>
          <ul className="list-disc list-inside mb-8">
            {data.map((member, index) => (
              member.outcomes && <li key={index} className="text-gray-600 dark:text-gray-400">{member.outcomes}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4">Our Functions</h2>
          <ul className="list-disc list-inside mb-8">
            {data.map((member, index) => (
              member.functions && <li key={index} className="text-gray-600 dark:text-gray-400">{member.functions}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TableView;