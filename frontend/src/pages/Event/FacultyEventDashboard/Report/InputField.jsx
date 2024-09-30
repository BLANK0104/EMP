import React from "react";

const InputField = ({ type, name, value, onChange, disabled, required, placeholder }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
      disabled={disabled}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
