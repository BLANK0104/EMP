import React from "react";

const CheckboxGroup = ({ options, selectedValues, onChange, disabled }) => (
  <div className="mb-4">
    {options.map((option) => (
      <label key={option.value} className="ml-4">
        <input
          type="checkbox"
          name={option.name}
          value={option.value}
          checked={selectedValues.includes(option.value)}
          onChange={(e) => onChange(e, option.type)}
          className="mr-2"
          disabled={disabled}
        />
        {option.label}
      </label>
    ))}
  </div>
);

export default CheckboxGroup;
