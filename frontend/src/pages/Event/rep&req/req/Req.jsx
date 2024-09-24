import React, { useState } from "react";

function EventRequestForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [school, setSchool] = useState("");
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [years, setYears] = useState([]);
  const [clubs, setClubs] = useState([""]);
  const [audience, setAudience] = useState("");
  const [venue, setVenue] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
    if (e.target.value === "MPSTME") {
      setBranches(["BTech", "MBA Tech"]);
      setClasses(["CS", "CE", "AIML", "IT"]);
      setYears(["1st", "2nd", "3rd", "4th"]);
    } else {
      setBranches([]);
      setClasses([]);
      setYears([]);
    }
  };

  const handleAddClub = () => {
    setClubs([...clubs, ""]);
  };

  const handleRemoveClub = (index) => {
    const newClubs = clubs.filter((_, i) => i !== index);
    setClubs(newClubs);
  };

  const handleClubChange = (index, value) => {
    const newClubs = [...clubs];
    newClubs[index] = value;
    setClubs(newClubs);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., API call)
    setFormSubmitted(true);
    // Optionally reset the form
  };

  const venueOptions = [
    "Amphitheater",
    "LR",
    "Auditorium",
    "Cricket ground",
    "Seminar hall",
    "Drawing hall",
    "Lab",
    "Wing",
  ];

  return (
    <div
      className={`max-w-4xl mx-auto p-8 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Event Request Form</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Event Title */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Event Title
          </label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Start Date and Time */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Start Date and Time
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* End Date and Time */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            End Date and Time
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Venue */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Venue
          </label>
          <select
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 bg-white border-gray-300 text-gray-900`}
          >
            <option value="">Select a venue</option>
            {venueOptions.map((venueOption) => (
              <option key={venueOption} value={venueOption}>
                {venueOption}
              </option>
            ))}
          </select>
        </div>

        {/* School */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            School
          </label>
          <select
            value={school}
            onChange={handleSchoolChange}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Select School</option>
            <option value="MPSTME">MPSTME</option>
            <option value="SPTM">SPTM</option>
            <option value="SAST">SAST</option>
            <option value="All">All</option>
          </select>
        </div>

        {/* Branch, Class, and Year */}
        {school === "MPSTME" && (
          <>
            {/* Branch */}
            <div className="mb-4">
              <label
                className={`block font-semibold mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Branch
              </label>
              <div className="flex flex-wrap">
                {branches.map((branch, index) => (
                  <label
                    key={index}
                    className={`flex items-center mr-4 mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 mr-2"
                      value={branch}
                      // Add onChange handler if you need to handle branch selection
                    />
                    {branch}
                  </label>
                ))}
              </div>
            </div>

            {/* Class */}
            <div className="mb-4">
              <label
                className={`block font-semibold mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Class
              </label>
              <div className="flex flex-wrap">
                {classes.map((cls, index) => (
                  <label
                    key={index}
                    className={`flex items-center mr-4 mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 mr-2"
                      value={cls}
                      // Add onChange handler if you need to handle class selection
                    />
                    {cls}
                  </label>
                ))}
              </div>
            </div>

            {/* Year */}
            <div className="mb-4">
              <label
                className={`block font-semibold mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Year
              </label>
              <div className="flex flex-wrap">
                {years.map((year, index) => (
                  <label
                    key={index}
                    className={`flex items-center mr-4 mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 mr-2"
                      value={year}
                      // Add onChange handler if you need to handle year selection
                    />
                    {year}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Objective/Outcomes */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Objective/Outcomes
          </label>
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Event Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Audience */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Audience
          </label>
          <input
            type="number"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            min="0"
          />
        </div>

        {/* Resources  */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Resources
          </label>
          <textarea
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Organizer */}
        <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Organizer
          </label>
          <select
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Select Organizer</option>
            <option value="Club">Club</option>
            <option value="Department">Department</option>
          </select>
        </div>

        {/* Clubs Involved */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Clubs Involved</label>
          {clubs.length > 0 ? (
            clubs.map((club, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={club}
                  onChange={(e) => handleClubChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300"
                  placeholder="Enter club name"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveClub(index)}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No clubs added yet. Click "Add Club" to add clubs.
            </p>
          )}
          <button
            type="button"
            onClick={handleAddClub}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Club
          </button>
        </div>

        {/* Signature */}
        {/* <div className="mb-4">
          <label
            className={`block font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Signature (Upload Image)
          </label>
          <input
            type="file"
            accept="image/*"
            className={`w-full px-4 py-2 border rounded-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            
          />
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring ${
              darkMode ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </form>

      {/* Toggle Dark Mode */}

      {formSubmitted && (
        <p className="mt-4 text-green-500">Form submitted successfully!</p>
      )}
    </div>
  );
}

export default EventRequestForm;
