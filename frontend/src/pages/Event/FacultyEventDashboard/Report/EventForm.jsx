import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import CheckboxGroup from "./CheckboxGroup";
import GuestSpeaker from "./GuestSpeaker";
import Coordinator from "./Coordinator";
import Objective from "./Objective";
import DescriptionTextarea from "./DescriptionTextarea";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    guestSpeakers: [{ name: "", designation: "" }],
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    objectives: ["", "", ""],
    venue: "",
    resources: "",
    audience: "",
    description: "",
    photos: [],
    facultyCoordinators: [{ name: "" }],
    studentCoordinators: [{ name: "" }, { name: "" }, { name: "" }],
    schools: [],
    branches: [],
    classes: [],
    years: [],
    clubs: "",
  });

  const [event_id, setEventId] = useState(null);
  const [data, setData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchDraft() {
      try {
        const response = await fetch(`${backendUrl}/report`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setData(data.latestEvent);
        setEventId(data.latestEvent.id);
      } catch (error) {
        console.error("Error fetching draft data:", error);
      }
    }
    fetchDraft();
  }, []);

  useEffect(() => {
    if (data && event_id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: data.title || "",
        type: data.eventtype?.[0] || "",
        guestSpeakers: data.guests || [{ name: "", designation: "" }],
        startDate: data.event_dates?.[0]?.date || "",
        startTime: data.event_dates?.[0]?.start_time || "",
        endDate: data.event_dates?.[0]?.date || "",
        endTime: data.event_dates?.[0]?.end_time || "",
        objectives: data.objectives || ["", "", ""],
        venue: data.event_dates?.[0]?.venues?.join(", ") || "",
        resources: data.resources || "",
        audience: data.audience || "",
        description: data.description || "",
        schools: data.school_audience?.school || [],
        branches: data.school_audience?.branch || [],
        classes: data.school_audience?.class || [],
        years: data.school_audience?.year || [],
      }));
    }
  }, [data, event_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "photos" ? files : value,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const updatedArray = checked
        ? [...prevFormData[type], value]
        : prevFormData[type].filter((item) => item !== value);
      return { ...prevFormData, [type]: updatedArray };
    });
  };

  const handleCoordinatorChange = (type, index, e) => {
    const { value } = e.target;
    const updatedCoordinators = formData[type].map((coordinator, i) =>
      i === index ? { ...coordinator, name: value } : coordinator
    );
    setFormData({ ...formData, [type]: updatedCoordinators });
  };

  const addCoordinator = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { name: "" }],
    });
  };

  const removeCoordinator = (type, index) => {
    if (formData[type].length > (type === "facultyCoordinators" ? 1 : 3)) {
      const updatedCoordinators = formData[type].filter((_, i) => i !== index);
      setFormData({ ...formData, [type]: updatedCoordinators });
    }
  };

  const handleGuestSpeakerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSpeakers = formData.guestSpeakers.map((speaker, i) =>
      i === index ? { ...speaker, [name]: value } : speaker
    );
    setFormData({ ...formData, guestSpeakers: updatedSpeakers });
  };

  const addGuestSpeaker = () => {
    setFormData({
      ...formData,
      guestSpeakers: [...formData.guestSpeakers, { name: "", designation: "" }],
    });
  };

  const removeGuestSpeaker = (index) => {
    if (formData.guestSpeakers.length > 1) {
      const updatedSpeakers = formData.guestSpeakers.filter((_, i) => i !== index);
      setFormData({ ...formData, guestSpeakers: updatedSpeakers });
    }
  };

  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = formData.objectives.map((objective, i) =>
      i === index ? value : objective
    );
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const addObjective = () => {
    setFormData({ ...formData, objectives: [...formData.objectives, ""] });
  };

  const removeObjective = (index) => {
    if (formData.objectives.length > 1) {
      const updatedObjectives = formData.objectives.filter((_, i) => i !== index);
      setFormData({ ...formData, objectives: updatedObjectives });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, event_id);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
      <h2 className="text-2xl mb-4">Event Form</h2>
      <InputField
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Event Title"
      />
      <InputField
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        placeholder="Event Type"
      />
      <h3 className="text-xl mb-2">Guest Speakers</h3>
      {formData.guestSpeakers.map((speaker, index) => (
        <GuestSpeaker
          key={index}
          speaker={speaker}
          index={index}
          onChange={handleGuestSpeakerChange}
          onRemove={() => removeGuestSpeaker(index)}
        />
      ))}
      <button
        type="button"
        onClick={addGuestSpeaker}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-700"
      >
        Add Guest Speaker
      </button>
      <h3 className="text-xl mb-2">Event Dates</h3>
      <InputField
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <InputField
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        required
      />
      <InputField
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <InputField
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        required
      />
      <h3 className="text-xl mb-2">Objectives</h3>
      {formData.objectives.map((objective, index) => (
        <Objective
          key={index}
          objective={objective}
          index={index}
          onChange={handleObjectiveChange}
          onRemove={() => removeObjective(index)}
        />
      ))}
      <button
        type="button"
        onClick={addObjective}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-700"
      >
        Add Objective
      </button>
      <DescriptionTextarea
        value={formData.description}
        onChange={handleChange}
        required
      />
      <h3 className="text-xl mb-2">Coordinators</h3>
      <h4 className="text-lg mb-2">Faculty Coordinators</h4>
      {formData.facultyCoordinators.map((coordinator, index) => (
        <Coordinator
          key={index}
          coordinator={coordinator}
          index={index}
          onChange={(i, e) => handleCoordinatorChange("facultyCoordinators", i, e)}
          onRemove={() => removeCoordinator("facultyCoordinators", index)}
        />
      ))}
      <button
        type="button"
        onClick={() => addCoordinator("facultyCoordinators")}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-700"
      >
        Add Faculty Coordinator
      </button>
      <h4 className="text-lg mb-2">Student Coordinators</h4>
      {formData.studentCoordinators.map((coordinator, index) => (
        <Coordinator
          key={index}
          coordinator={coordinator}
          index={index}
          onChange={(i, e) => handleCoordinatorChange("studentCoordinators", i, e)}
          onRemove={() => removeCoordinator("studentCoordinators", index)}
        />
      ))}
      <button
        type="button"
        onClick={() => addCoordinator("studentCoordinators")}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-700"
      >
        Add Student Coordinator
      </button>
      <h3 className="text-xl mb-2">Checkboxes</h3>
      <CheckboxGroup
        options={[
          { label: "School 1", value: "school1", type: "schools" },
          { label: "School 2", value: "school2", type: "schools" },
        ]}
        selectedValues={formData.schools}
        onChange={handleCheckboxChange}
      />
      <CheckboxGroup
        options={[
          { label: "Branch 1", value: "branch1", type: "branches" },
          { label: "Branch 2", value: "branch2", type: "branches" },
        ]}
        selectedValues={formData.branches}
        onChange={handleCheckboxChange}
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm;
