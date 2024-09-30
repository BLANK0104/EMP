import React from "react";

const DescriptionTextarea = ({ value, onChange, required }) => (
  <div className="mb-4">
    <textarea
      name="description"
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded w-full h-300 bg-white dark:bg-gray-800"
      required={required}
      placeholder="Description"
    ></textarea>
  </div>
);

export default DescriptionTextarea;
