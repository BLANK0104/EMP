import React, { useEffect, useState } from "react";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const FormComponent = ({ onSubmit }) => {
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
    studentCoordinators: [
      { name: "" },
      { name: "" },
      { name: "" }
    ],
    schools: [],
    branches: [],
    classes: [],
    years: [],
    clubs: "",
    externalInput: "",
    cname: "" // Initialize cname as an empty string
    
  });

  const [event_id, setEventId] = useState(null); // Initialize event_id separately
  const [data, setData] = useState(null); // Holds the fetched draft data

  // Fetch draft data when the component mounts
  useEffect(() => {
    async function fetchDraft() {
      try {
        const response = await fetch(`${backendUrl}/report`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.latestEvent);

        setData(data.latestEvent); // Store draft data
        setEventId(data.latestEvent.id); // Set event ID
      } catch (error) {
        console.error("Error fetching draft data:", error);
      }
    }

    fetchDraft();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Update formData when data or event_id is available
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
        externalInput: data.school_audience?.externalInput || "", // Corrected line
        event_id: event_id, // Set event_id after fetching
        fname: data.coordinator || "",
        cname: data.username,
        facultyCoordinators: [{ name: data.coordinator || "" }] // Update facultyCoordinators
      }));
    }
  }, [data, event_id]); // Runs whenever data or event_id changes

  console.log("formData", formData);
  //console.log("externalInput", data?.externalInput);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photos") {
      setFormData({
        ...formData,
        photos: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
    const updatedGuestSpeakers = formData.guestSpeakers.map((guestSpeaker, i) =>
      i === index ? { ...guestSpeaker, [name]: value } : guestSpeaker
    );
    setFormData({ ...formData, guestSpeakers: updatedGuestSpeakers });
  };

  const addGuestSpeaker = () => {
    setFormData({
      ...formData,
      guestSpeakers: [...formData.guestSpeakers, { name: "", designation: "" }],
    });
  };

  const removeGuestSpeaker = (index) => {
    if (formData.guestSpeakers.length > 1) {
      const updatedGuestSpeakers = formData.guestSpeakers.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, guestSpeakers: updatedGuestSpeakers });
    }
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    setFormData({
      ...formData,
      objectives: newObjectives,
    });
  };

  const addObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, ""],
    });
  };

  const removeObjective = (index) => {
    if (formData.objectives.length > 3) {
      const newObjectives = formData.objectives.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        objectives: newObjectives,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/report-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Form data submitted successfully:", result);
        onSubmit(formData);
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Refresh the website 2 seconds after submitting the form
      } else {
        console.error("Failed to submit form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="min-h-screen text-black dark:text-white flex">
      <form
        className="p-8 w-full max-w-full lg:max-w-screen-lg mx-0 lg:mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Event Form</h2>
          <button
            type="button"
            onClick={toggleEditMode}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            {isEditMode ? "Lock" : "Edit"}
          </button>
        </div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <div>
          <label htmlFor="type">Event Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
            disabled={!isEditMode}
            required
          />
        </div>
        {formData.guestSpeakers.map((guestSpeaker, index) => (
          <div key={index} className="mb-4">
            <label>Guest/Speaker Name:</label>
            <input
              type="text"
              name="name"
              value={guestSpeaker.name}
              onChange={(e) => handleGuestSpeakerChange(index, e)}
              placeholder="Guest/Speaker Name"
              className="mb-2 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
              disabled={!isEditMode}
              required
            />
            <label>Guest/Speaker Designation:</label>
            <input
              type="text"
              name="designation"
              value={guestSpeaker.designation}
              onChange={(e) => handleGuestSpeakerChange(index, e)}
              placeholder="Guest/Speaker Designation"
              className="mb-2 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
              disabled={!isEditMode}
              required
            />
            {formData.guestSpeakers.length > 1 && (
              <button
                type="button"
                onClick={() => removeGuestSpeaker(index)}
                className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-700"
                disabled={!isEditMode}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addGuestSpeaker}
          className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-700 mb-4"
          disabled={!isEditMode}
        >
          Add Guest Speaker
        </button>
        <label>Start date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="Start Date"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <label>Start time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          placeholder="Start Time"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <label>End date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="End Date"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <label>End time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          placeholder="End Time"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <label>Resources:</label>
        <input
          type="text"
          name="resources"
          value={formData.resources}
          onChange={handleChange}
          placeholder="Resources"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <div>
          <label>Schools:</label>
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                name="schools"
                value="MPSTME"
                checked={formData.schools.includes("MPSTME")}
                onChange={(e) => handleCheckboxChange(e, "schools")}
                className="mr-2"
                disabled={!isEditMode}
              />
              MPSTME
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="schools"
                value="SPTM"
                checked={formData.schools.includes("SPTM")}
                onChange={(e) => handleCheckboxChange(e, "schools")}
                className="mr-2"
                disabled={!isEditMode}
              />
              SPTM
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="schools"
                value="SAST"
                checked={formData.schools.includes("SAST")}
                onChange={(e) => handleCheckboxChange(e, "schools")}
                className="mr-2"
                disabled={!isEditMode}
              />
              SAST
            </label>
          </div>
        </div>
        {formData.schools.includes("MPSTME") && (
          <div>
            <label>Branches:</label>
            <div className="mb-4">
              <label>
                <input
                  type="checkbox"
                  name="branches"
                  value="BTech"
                  checked={formData.branches.includes("BTech")}
                  onChange={(e) => handleCheckboxChange(e, "branches")}
                  className="mr-2"
                  disabled={!isEditMode}
                />
                BTech
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  name="branches"
                  value="MBATech"
                  checked={formData.branches.includes("MBATech")}
                  onChange={(e) => handleCheckboxChange(e, "branches")}
                  className="mr-2"
                  disabled={!isEditMode}
                />
                MBATech
              </label>
            </div>
          </div>
        )}
{formData.schools.includes("SPTM") && (
  <div>
    <label>Branches:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="branches"
          value="BPharma"
          checked={formData.branches.includes("BPharma")}
          onChange={(e) => handleCheckboxChange(e, "branches")}
          className="mr-2"
          disabled={!isEditMode}
        />
        BPharma
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="branches"
          value="MPharma"
          checked={formData.branches.includes("MPharma")}
          onChange={(e) => handleCheckboxChange(e, "branches")}
          className="mr-2"
          disabled={!isEditMode}
        />
        MPharma
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="branches"
          value="BPharmaMBA"
          checked={formData.branches.includes("BPharmaMBA")}
          onChange={(e) => handleCheckboxChange(e, "branches")}
          className="mr-2"
          disabled={!isEditMode}
        />
        BPharmaMBA
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="branches"
          value="MPharmaMBA"
          checked={formData.branches.includes("MPharmaMBA")}
          onChange={(e) => handleCheckboxChange(e, "branches")}
          className="mr-2"
          disabled={!isEditMode}
        />
        MPharmaMBA
      </label>
    </div>
  </div>
)}

{formData.schools.includes("SAST") && (
  <div>
    <label>Branches:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="branches"
          value="Agriculture"
          checked={formData.branches.includes("Agriculture")}
          onChange={(e) => handleCheckboxChange(e, "branches")}
          className="mr-2"
          disabled={!isEditMode}
        />
        Agriculture
      </label>
    </div>
  </div>
)}

{formData.branches.includes("BPharma") && (
  <div>
    <label>Classes:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="classes"
          value="B.Pharma"
          checked={formData.classes.includes("B.Pharma")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        B.Pharma
      </label>
    </div>
  </div>
)}

{formData.branches.includes("MPharma") && (
  <div>
    <label>Classes:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="classes"
          value="M.Pharma"
          checked={formData.classes.includes("M.Pharma")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        M.Pharma
      </label>
    </div>
  </div>
)}

{formData.branches.includes("BPharmaMBA") && (
  <div>
    <label>Classes:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="classes"
          value="BPharma + MBA"
          checked={formData.classes.includes("BPharma + MBA")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        BPharma + MBA
      </label>
    </div>
  </div>
)}

{formData.branches.includes("MPharmaMBA") && (
  <div>
    <label>Classes:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="classes"
          value="MPharma + MBA"
          checked={formData.classes.includes("MPharma + MBA")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        MPharma + MBA
      </label>
    </div>
  </div>
)}

{formData.branches.includes("BTech") && (
  <div>
    <label>Classes:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="classes"
          value="CE"
          checked={formData.classes.includes("CE")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        CE
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="classes"
          value="CS"
          checked={formData.classes.includes("CS")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        CS
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="classes"
          value="IT"
          checked={formData.classes.includes("IT")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        IT
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="classes"
          value="AI/ML"
          checked={formData.classes.includes("AI/ML")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        AI/ML
      </label>
    </div>
  </div>
)}

{formData.branches.includes("Agriculture") && (
  <div>
    <label>Classes:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="classes"
          value="AGRICULTURE"
          checked={formData.classes.includes("AGRICULTURE")}
          onChange={(e) => handleCheckboxChange(e, "classes")}
          className="mr-2"
          disabled={!isEditMode}
        />
        AGRICULTURE
      </label>
    </div>
  </div>
)}

{formData.classes.length > 0 && (
  <div>
    <label>Years:</label>
    <div className="mb-4">
      <label>
        <input
          type="checkbox"
          name="years"
          value="1st Year"
          checked={formData.years.includes("1st Year")}
          onChange={(e) => handleCheckboxChange(e, "years")}
          className="mr-2"
          disabled={!isEditMode}
        />
        First Year
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="years"
          value="2nd Year"
          checked={formData.years.includes("2nd Year")}
          onChange={(e) => handleCheckboxChange(e, "years")}
          className="mr-2"
          disabled={!isEditMode}
        />
        Second Year
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="years"
          value="3rd Year"
          checked={formData.years.includes("3rd Year")}
          onChange={(e) => handleCheckboxChange(e, "years")}
          className="mr-2"
          disabled={!isEditMode}
        />
        Third Year
      </label>
      <label className="ml-4">
        <input
          type="checkbox"
          name="years"
          value="4th Year"
          checked={formData.years.includes("4th Year")}
          onChange={(e) => handleCheckboxChange(e, "years")}
          className="mr-2"
          disabled={!isEditMode}
        />
        Fourth Year
      </label>
    </div>
  </div>
)}


<div className="mt-4">
              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                External Audience 
              </label>
              <input
                type="text"
                value={formData.externalInput}
                className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder=" external audience"
                disabled={!isEditMode}
              />
            </div>
        <label>Audience description:</label>
        <input
          type="text"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          placeholder="Audience"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <label>Collaboration:</label>
        <input
          type="text"
          name="clubs"
          value={formData.clubs ||"N/A"}
          onChange={handleChange}
          placeholder="Collaboration"
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
          disabled={!isEditMode}
          required
        />
        <div>
          <label>Objectives:</label>
          {formData.objectives.map((objective, index) => (
            <div key={index}>
              <input
                type="text"
                name={`objective-${index}`}
                value={objective}
                onChange={(e) => handleObjectiveChange(index, e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
                disabled={!isEditMode}
                required
              />
              {formData.objectives.length > 3 && (
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addObjective}
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-700 mb-4"
          >
            Add Objective
          </button>
        </div>
        <label>
          Description (Please provide a detailed description of the event in at
          least 150 words):
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-4 p-2 border border-gray-300 rounded w-full h-300 bg-white dark:bg-gray-800"
          required
        ></textarea>
        <div>
          <label>Faculty Coordinators:</label>
          {formData.facultyCoordinators.map((coordinator, index) => (
            <div key={index}>
              {console.log("coordinator.name:", coordinator.name)}
              <input
                type="text"
                name={`facultyCoordinators[${index}].name`}
                value={coordinator.name}
                onChange={(e) =>
                  handleCoordinatorChange("facultyCoordinators", index, e)
                }
                className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
              />
              {formData.facultyCoordinators.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeCoordinator("facultyCoordinators", index)
                  }
                  className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addCoordinator("facultyCoordinators")}
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-700 mb-4"
          >
            Add Faculty Coordinator
          </button>
        </div>
        <div>
          <label>Student Coordinators:</label>
          {formData.studentCoordinators.map((coordinator, index) => (
            <div key={index}>
              <input
                type="text"
                name={`studentCoordinator-${index}`}
                value={coordinator.name}
                onChange={(e) =>
                  handleCoordinatorChange("studentCoordinators", index, e)
                }
                className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
              />
              {formData.studentCoordinators.length > 3 && (
                <button
                  type="button"
                  onClick={() =>
                    removeCoordinator("studentCoordinators", index)
                  }
                  className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addCoordinator("studentCoordinators")}
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-700 mb-4"
          >
            Add Student Coordinator
          </button>
        </div>

        <label className="block mb-2">Media Input</label>
        <input
          type="file"
          name="photos"
          multiple
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full bg-white dark:bg-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;