import React from "react";
import InputField from "./InputField";

const Objective = ({ objective, index, onChange, onRemove, disabled }) => (
  <div className="mb-4">
    <InputField
      type="text"
      name={`objective-${index}`}
      value={objective}
      onChange={(e) => onChange(index, e.target.value)}
      disabled={disabled}
      required
    />
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-700"
        disabled={disabled}
      >
        Remove
      </button>
    )}
  </div>
);

export default Objective;
