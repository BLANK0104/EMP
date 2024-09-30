import React from "react";
import InputField from "./InputField";

const Coordinator = ({ coordinator, index, onChange, onRemove, disabled }) => (
  <div className="mb-4">
    <InputField
      type="text"
      name={`coordinator-${index}`}
      value={coordinator.name}
      onChange={(e) => onChange(index, e)}
      disabled={disabled}
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

export default Coordinator;
