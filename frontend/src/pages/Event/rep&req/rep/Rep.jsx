import React, { useState } from "react";

function EventReportForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    guestSpeakers: "",
    venue: "",
    startDateTime: "",
    endDateTime: "",
    socialMediaLinks: "",
    programType: "",
    objective: "",
    benefits: "",
    facultyCoordinators: "",
    studentCoordinators: "",
    studentParticipants: "",
    facultyParticipants: "",
    externalParticipants: "",
    modeOfDelivery: "",
    background: "",
    report: "",
    conclusion: "",
    signature: null, // Added for signature photo
  });

  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle Change for Input Fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "signature") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate Form
  const validate = () => {
    let tempErrors = {};

    if (!formData.eventName.trim())
      tempErrors.eventName = "Event Name is required.";
    if (!formData.guestSpeakers.trim())
      tempErrors.guestSpeakers = "Guest Speakers are required.";
    if (!formData.venue.trim()) tempErrors.venue = "Venue is required.";
    if (!formData.startDateTime)
      tempErrors.startDateTime = "Start Date and Time are required.";
    if (!formData.endDateTime)
      tempErrors.endDateTime = "End Date and Time are required.";
    if (!formData.programType.trim())
      tempErrors.programType = "Program Type is required.";
    if (!formData.objective.trim())
      tempErrors.objective = "Objective is required.";
    if (!formData.benefits.trim())
      tempErrors.benefits = "Benefits are required.";
    if (!formData.facultyCoordinators.trim())
      tempErrors.facultyCoordinators = "Faculty Coordinators are required.";
    if (!formData.studentCoordinators.trim())
      tempErrors.studentCoordinators = "Student Coordinators are required.";
    if (!formData.studentParticipants)
      tempErrors.studentParticipants =
        "Number of Student Participants is required.";
    if (!formData.facultyParticipants)
      tempErrors.facultyParticipants =
        "Number of Faculty Participants is required.";
    if (!formData.externalParticipants)
      tempErrors.externalParticipants =
        "Number of External Participants is required.";
    if (!formData.modeOfDelivery.trim())
      tempErrors.modeOfDelivery = "Mode of Delivery is required.";
    if (!formData.background.trim())
      tempErrors.background = "Background information is required.";
    if (!formData.report.trim()) tempErrors.report = "Report is required.";
    if (!formData.conclusion.trim())
      tempErrors.conclusion = "Conclusion is required.";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully! Check the console for form data.");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Event Report Form</h2>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Event Details Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Event Details</h3>

          {/* Event Name */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.eventName ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.eventName && (
              <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
            )}
          </div>

          {/* Guest Speakers */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Guest Speakers/Judges/Mentors:
            </label>
            <textarea
              name="guestSpeakers"
              value={formData.guestSpeakers}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.guestSpeakers ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              rows="3"
            ></textarea>
            {errors.guestSpeakers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guestSpeakers}
              </p>
            )}
          </div>

          {/* Venue */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Venue:</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.venue ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.venue && (
              <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
            )}
          </div>

          {/* Start and End Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Start Date & Time:
              </label>
              <input
                type="datetime-local"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.startDateTime ? "border-red-500" : "border-gray-300"
                } ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              />
              {errors.startDateTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDateTime}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">End Date & Time:</label>
              <input
                type="datetime-local"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.endDateTime ? "border-red-500" : "border-gray-300"
                } ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              />
              {errors.endDateTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDateTime}
                </p>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-4 mt-4">
            <label className="block font-medium mb-1">
              Social Media Links of e-Pamphlet:
            </label>
            <input
              type="url"
              name="socialMediaLinks"
              value={formData.socialMediaLinks}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.socialMediaLinks ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.socialMediaLinks && (
              <p className="text-red-500 text-sm mt-1">
                {errors.socialMediaLinks}
              </p>
            )}
          </div>

          {/* Program Type */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Program Type:</label>
            <input
              type="text"
              name="programType"
              value={formData.programType}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.programType ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.programType && (
              <p className="text-red-500 text-sm mt-1">{errors.programType}</p>
            )}
          </div>

          {/* Objective */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Objective:</label>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.objective ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              rows="3"
            ></textarea>
            {errors.objective && (
              <p className="text-red-500 text-sm mt-1">{errors.objective}</p>
            )}
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Benefits:</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.benefits ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              rows="3"
            ></textarea>
            {errors.benefits && (
              <p className="text-red-500 text-sm mt-1">{errors.benefits}</p>
            )}
          </div>

          {/* Faculty Coordinators */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Faculty Coordinators:
            </label>
            <input
              type="text"
              name="facultyCoordinators"
              value={formData.facultyCoordinators}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.facultyCoordinators
                  ? "border-red-500"
                  : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.facultyCoordinators && (
              <p className="text-red-500 text-sm mt-1">
                {errors.facultyCoordinators}
              </p>
            )}
          </div>

          {/* Student Coordinators */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Student Coordinators:
            </label>
            <input
              type="text"
              name="studentCoordinators"
              value={formData.studentCoordinators}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.studentCoordinators
                  ? "border-red-500"
                  : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.studentCoordinators && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentCoordinators}
              </p>
            )}
          </div>

          {/* Student Participants */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Number of Student Participants:
            </label>
            <input
              type="number"
              name="studentParticipants"
              value={formData.studentParticipants}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.studentParticipants
                  ? "border-red-500"
                  : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.studentParticipants && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentParticipants}
              </p>
            )}
          </div>

          {/* Faculty Participants */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Number of Faculty Participants:
            </label>
            <input
              type="number"
              name="facultyParticipants"
              value={formData.facultyParticipants}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.facultyParticipants
                  ? "border-red-500"
                  : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.facultyParticipants && (
              <p className="text-red-500 text-sm mt-1">
                {errors.facultyParticipants}
              </p>
            )}
          </div>

          {/* External Participants */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Number of External Participants:
            </label>
            <input
              type="number"
              name="externalParticipants"
              value={formData.externalParticipants}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.externalParticipants
                  ? "border-red-500"
                  : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.externalParticipants && (
              <p className="text-red-500 text-sm mt-1">
                {errors.externalParticipants}
              </p>
            )}
          </div>

          {/* Mode of Delivery */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Mode of Delivery:</label>
            <input
              type="text"
              name="modeOfDelivery"
              value={formData.modeOfDelivery}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.modeOfDelivery ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.modeOfDelivery && (
              <p className="text-red-500 text-sm mt-1">
                {errors.modeOfDelivery}
              </p>
            )}
          </div>

          {/* Background */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Background Information:
            </label>
            <textarea
              name="background"
              value={formData.background}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.background ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              rows="3"
            ></textarea>
            {errors.background && (
              <p className="text-red-500 text-sm mt-1">{errors.background}</p>
            )}
          </div>

          {/* Report */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Report:</label>
            <textarea
              name="report"
              value={formData.report}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.report ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              rows="3"
            ></textarea>
            {errors.report && (
              <p className="text-red-500 text-sm mt-1">{errors.report}</p>
            )}
          </div>

          {/* Conclusion */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Conclusion:</label>
            <textarea
              name="conclusion"
              value={formData.conclusion}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.conclusion ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              rows="3"
            ></textarea>
            {errors.conclusion && (
              <p className="text-red-500 text-sm mt-1">{errors.conclusion}</p>
            )}
          </div>

          {/* Signature Field */}
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Signature (Upload Photo):
            </label>
            <input
              type="file"
              name="signature"
              accept="image/*"
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.signature ? "border-red-500" : "border-gray-300"
              } ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
            {errors.signature && (
              <p className="text-red-500 text-sm mt-1">{errors.signature}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventReportForm;
