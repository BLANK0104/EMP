import React from 'react';

const ClubSelector = ({ selectedTable, setSelectedTable, tables }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Select a Club</h2>
      <select
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option value="">-- Select a table --</option>
        {tables.map((table) => (
          <option key={table.value} value={table.value}>
            {table.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClubSelector;
