import React from "react";
import InputField from "./InputField";

const GuestSpeaker = ({ speaker, index, onChange, onRemove, disabled }) => (
  <div className="mb-4">
    <InputField
      type="text"
      name="name"
      value={speaker.name}
      onChange={(e) => onChange(index, e)}
      placeholder="Guest/Speaker Name"
      disabled={disabled}
      required
    />
    <InputField
      type="text"
      name="designation"
      value={speaker.designation}
      onChange={(e) => onChange(index, e)}
      placeholder="Guest/Speaker Designation"
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

export default GuestSpeaker;
