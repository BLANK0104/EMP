import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TermsPopup from "./Termspop";
const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const venueOptions = [
  "Amphitheater",
  "Auditorium",
  "Playground",
  "Seminar hall",
  "Drawing hall",
  "Lab",
  "A-Wing",
  "B-Wing",
  "Music Room",
  "Dance Room",
  "Central Fourier(CF)",
  "Sobus",
  "Student Lounge",
  "Conference Room",
  "LR",
  "Classroom",
  "Others",
];

const eventTypes = [
  "Activity/Event",
  "Alumni Meet",
  "Conferences",
  "Convocation",
  "Cultural Events",
  "Expert Talk",
  "Expert Visit",
  "Faculty Development Program",
  "Farewell",
  "Festival",
  "Freshers Party",
  "Intership",
  "Induction",
  "Industrial Visit",
  "Orientation",
  "Regional/State/National Meet",
  "Seminar",
  "Sports",
  "Student Paper Program",
  "STPP",
  "Technical Events",
  "Technical Paper Program",
  "Training",
  "Webinar",
  "Workshop/Handzore",
  "Other",
];

const clubEvents = [
  "INSTITUTIONS INNOVATIONS COUNCIL(IIC)",
  "IPR CELL",
  "E-CELL",
  "INSTITUE-INDUSTRY INTERACTION AND INTERSHIP CELL(I4C)",
  "NATIONAL INNOVATION AND START-UP POLICY CELL(NISP)",
  "Saturday 10AM",
  "EACH ONE SAVE ONE",
  "RAW VISION CLUB",
  "ATRANGI CLUB",
  "Computer Society Of India(CSI)",
  "NMMUN(Narsee Monjee Model United Nation)",
  "Coding Club",
  "App development Club",
  "TEAM UAS NMIMS (Drone Club)",
  "ISTE",
  "IEEE",
  "Society 4DS",
  "AVINYA-IOT LAB",
  "Learn Tech with NMIMS Shirpur",
  "FLAVIUM",
  "AMBIORA-Technical Fest",
  "PROTSAHAN",
  "Others",
];

const RequestForm = () => {
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [audience, setAudience] = useState(0);
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [eventDates, setEventDates] = useState([
    {
      date: "",
      startTime: "",
      endTime: "",
      venues: [""],
      classroomVenues: [],
      otherVenue: "",
      selectedWings: [],
      selectedFloors: [],
      selectedRooms: [],
    },
  ]);
  const [eventType, setEventType] = useState([]);
  const [objectives, setObjectives] = useState(["", "", ""]);
  const [otherEvent, setOtherEvent] = useState("");
  const [otherClub, setOtherClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [guests, setGuests] = useState([{ name: "", designation: "" }]);

  // useEffect(() => {
  //   async function fetchDraft() {
  //     try {
  //         const response = await fetch(`${backendUrl}/get-draft`, {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       // console.log(response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();

  //       console.log(data);

  //       // Populate form state with draft data
  //       setSelectedSchools(data.selectedSchools || []);
  //       setSelectedCourses(data.selectedCourses || []);
  //       setSelectedBranches(data.selectedBranches || []);
  //       setSelectedYears(data.selectedYears || []);
  //       setAudience(data.audience || 0);
  //       setEventTitle(data.eventTitle || "");
  //       setDescription(data.description || "");
  //       setResources(data.resources || []);
  //       setEventDates(
  //         data.eventDates.length > 0
  //           ? data.eventDates
  //           : [
  //               {
  //                 date: "",
  //                 startTime: "",
  //                 endTime: "",
  //                 venues: [""],
  //                 classroomVenues: [],
  //                 otherVenue: "",
  //                 selectedWings: [],
  //                 selectedFloors: [],
  //                 selectedRooms: [],
  //               },
  //             ]
  //       );
  //       setEventType(data.eventType || []);
  //       setObjectives(data.objectives || ["", "", ""]);
  //       setOtherEvent(data.otherEvent || "");
  //       setOtherClub(data.otherClub || "");
  //       setClubs(data.clubs || []);
  //       setGuests(data.guests || [{ name: "", designation: "" }]);
  //     } catch (error) {
  //       console.error("Error fetching draft data:", error);
  //     }
  //   }

  //   fetchDraft();
  // }, []);

  const validClassroomRanges = [
    { start: 101, end: 104 },
    { start: 201, end: 203 },
  ];

  const floorOptions = {
    "B-Wing": ["Ground Floor", "1st Floor", "2nd Floor"],
    "C-Wing": ["1st Floor", "2nd Floor"],
    "D-Wing": ["Ground Floor"],
  };

  const roomOptions = {
    "B-Wing": {
      "Ground Floor": [1, 2, 3, 4, 5],
      "1st Floor": [6, 7, 8, 9],
      "2nd Floor": [10, 11, 12],
    },
    "C-Wing": {
      "1st Floor": [11, 12, 13, 14, 15, 16],
      "2nd Floor": [17, 18, 19],
    },
    "D-Wing": {
      "Ground Floor": [20, 21, 22, 23, 24, 25],
    },
  };

  const handleVenueChange = (dateIndex, venueIndex, value) => {
    const updatedDates = [...eventDates];
    const event = updatedDates[dateIndex];

    updatedDates[dateIndex].venues[venueIndex] = value;

    // Check and clear data only if necessary
    if (value !== "Classroom") {
      // Reset classroom venues only if the previous venue was Classroom
      if (event.venues[venueIndex] === "Classroom") {
        updatedDates[dateIndex].classroomVenues = [];
      }
    }

    if (value !== "Others") {
      // Reset other venue only if the previous venue was Others
      if (event.venues[venueIndex] === "Others") {
        updatedDates[dateIndex].otherVenue = "";
      }
    }

    if (value !== "LR") {
      // Reset selectedWings, selectedFloors, selectedRooms only if the previous venue was LR
      if (event.venues[venueIndex] === "LR") {
        updatedDates[dateIndex].selectedWings = [];
        updatedDates[dateIndex].selectedFloors = [];
        updatedDates[dateIndex].selectedRooms = [];
      }
    }

    setEventDates(updatedDates);
  };

  const handleClassroomChange = (dateIndex, number) => {
    const updatedDates = [...eventDates];
    const { classroomVenues } = updatedDates[dateIndex];

    if (classroomVenues.includes(number)) {
      updatedDates[dateIndex].classroomVenues = classroomVenues.filter(
        (item) => item !== number
      );
    } else {
      updatedDates[dateIndex].classroomVenues = [...classroomVenues, number];
    }

    setEventDates(updatedDates);
  };

  const handleWingChange = (dateIndex, wing) => {
    const updatedDates = [...eventDates];
    const { selectedWings } = updatedDates[dateIndex];

    if (selectedWings.includes(wing)) {
      updatedDates[dateIndex].selectedWings = selectedWings.filter(
        (w) => w !== wing
      );
    } else {
      updatedDates[dateIndex].selectedWings = [...selectedWings, wing];
    }

    updatedDates[dateIndex].selectedFloors = []; // Reset floors when wings change
    setEventDates(updatedDates);
  };

  const handleFloorChange = (dateIndex, floor) => {
    const updatedDates = [...eventDates];
    const { selectedFloors } = updatedDates[dateIndex];

    if (selectedFloors.includes(floor)) {
      updatedDates[dateIndex].selectedFloors = selectedFloors.filter(
        (f) => f !== floor
      );
    } else {
      updatedDates[dateIndex].selectedFloors = [...selectedFloors, floor];
    }

    const availableFloors = new Set();
    updatedDates[dateIndex].selectedWings.forEach((selectedWing) => {
      floorOptions[selectedWing].forEach((floor) => availableFloors.add(floor));
    });

    setEventDates(updatedDates);
  };

  const handleRoomChange = (dateIndex, room) => {
    const updatedDates = [...eventDates];
    const { selectedRooms } = updatedDates[dateIndex];

    if (selectedRooms.includes(room)) {
      updatedDates[dateIndex].selectedRooms = selectedRooms.filter(
        (r) => r !== room
      );
    } else {
      updatedDates[dateIndex].selectedRooms = [...selectedRooms, room];
    }

    setEventDates(updatedDates);
  };

  const handleAddEventDate = () => {
    setEventDates([
      ...eventDates,
      {
        date: "",
        startTime: "",
        endTime: "",
        venues: [""],
        classroomVenues: [],
        otherVenue: "",
        selectedWings: [],
        selectedFloors: [],
      },
    ]);
  };

  const handleRemoveEventDate = (index) => {
    const updatedDates = eventDates.filter((_, i) => i !== index);
    setEventDates(updatedDates);
  };

  const handleEventDateChange = (index, field, value) => {
    const updatedDates = eventDates.map((event, i) =>
      i === index ? { ...event, [field]: value } : event
    );
    setEventDates(updatedDates);
  };

  const today = new Date();
  const formattedDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const handleAddVenue = (dateIndex) => {
    const updatedDates = [...eventDates];
    updatedDates[dateIndex].venues.push("");
    setEventDates(updatedDates);
  };

  const handleRemoveVenue = (dateIndex, venueIndex) => {
    const updatedDates = [...eventDates];
    updatedDates[dateIndex].venues = updatedDates[dateIndex].venues.filter(
      (_, i) => i !== venueIndex
    );
    setEventDates(updatedDates);
  };

  const courses = {
    MPSTME: ["BTech", "MBATech"],
    SPTM: ["BPharma", "MPharma", "BPharmaMBA", "MPharmaMBA"],
    SAST: ["Agriculture"],
  };

  const branches = {
    BTech: ["AI/ML", "CE", "CS", "IT"],
    MBATech: ["MBATech CE"],
    BPharmaMBA: ["BPharma + MBA"],
    MPharmaMBA: ["MPharma + MBA"],
    BPharma: ["B.Pharma"],
    MPharma: ["M.Pharma"],
    Agriculture: ["AGRICULTURE"],
  };

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleSchoolChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSchools((prev) =>
      checked ? [...prev, value] : prev.filter((school) => school !== value)
    );
    setSelectedCourses([]);
    setSelectedBranches([]);
    setSelectedYears([]);
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCourses((prev) =>
      checked ? [...prev, value] : prev.filter((course) => course !== value)
    );
    setSelectedBranches([]);
  };

  const handleBranchChange = (e) => {
    const { value, checked } = e.target;
    setSelectedBranches((prev) =>
      checked ? [...prev, value] : prev.filter((branch) => branch !== value)
    );
  };

  const handleYearChange = (e) => {
    const { value, checked } = e.target;
    setSelectedYears((prev) =>
      checked ? [...prev, value] : prev.filter((year) => year !== value)
    );
  };

  const handleEventTypeChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setEventType(selectedOptions);
  };

  const handleOtherEventChange = (e) => {
    setOtherEvent(e.target.value);
  };

  const handleClubChange = (e, index) => {
    const updatedClubs = [...clubs];
    updatedClubs[index] = e.target.value;
    setClubs(updatedClubs);
  };

  const handleOtherClub = (e) => {
    setOtherClub(e.target.value);
  };

  const handleAddClub = () => {
    setClubs([...clubs, ""]);
  };

  const handleRemoveClub = (index) => {
    const newClubs = clubs.filter((_, i) => i !== index);
    setClubs(newClubs);
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const addObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const removeObjective = (index) => {
    if (objectives.length > 3) {
      const newObjectives = objectives.filter((_, i) => i !== index);
      setObjectives(newObjectives);
    }
  };

  const handleGuestChange = (index, field, value) => {
    const newGuests = [...guests];
    newGuests[index][field] = value;
    setGuests(newGuests);
  };

  const addGuest = () => {
    setGuests([...guests, { name: "", designation: "" }]);
  };

  const removeGuest = (index) => {
    if (guests.length > 1) {
      const newGuests = guests.filter((_, i) => i !== index);
      setGuests(newGuests);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const handleDraft = async () => {
    // Create formData object
    console.log(otherClub);
    const formData = {
      eventTitle,
      description,
      audience: parseInt(audience, 10),
      resources: JSON.stringify(resources),
      clubs: clubs,
      otherClub: otherClub,
      eventType: eventType,
      otherEvent: otherEvent,
      objectives: objectives,
      guests: JSON.stringify(guests),
      eventDates: JSON.stringify(
        eventDates.map((event) => ({
          date: event.date,
          start_time: event.startTime,
          end_time: event.endTime,
          venues: event.venues,
          classroomVenues: event.classroomVenues,
          otherVenue: event.otherVenue,
          selectedWings: event.selectedWings,
          selectedFloors: event.selectedFloors,
        }))
      ),
      school_audience: JSON.stringify({
        school: selectedSchools,
        branch: selectedCourses,
        class: selectedBranches,
        year: selectedYears,
      }),
    };

    console.log(formData);

    try {
      const response = await fetch(`${backendUrl}/event-draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error in Draft submission:", error);
    }
  };

  const handleFinalSubmit = async () => {
    // Create formData object
    const formData = {
      eventTitle,
      description,
      audience: parseInt(audience, 10),
      resources: JSON.stringify(resources),
      clubs: clubs,
      otherClub: otherClub,
      eventType: eventType,
      otherEvent: otherEvent,
      objectives: objectives,
      guests: JSON.stringify(guests),
      eventDates: JSON.stringify(
        eventDates.map((event) => ({
          date: event.date,
          start_time: event.startTime,
          end_time: event.endTime,
          venues: event.venues,
          classroomVenues: event.classroomVenues,
          otherVenue: event.otherVenue,
          selectedWings: event.selectedWings,
          selectedFloors: event.selectedFloors,
        }))
      ),
      school_audience: JSON.stringify({
        school: selectedSchools,
        branch: selectedCourses,
        class: selectedBranches,
        year: selectedYears,
      }),
    };

    console.log(formData);

    try {
      const response = await fetch(`${backendUrl}/event-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setSelectedSchools([]);
        setSelectedCourses([]);
        setSelectedBranches([]);
        setSelectedYears([]);
        setClubs([]);
        setAudience(0);
        setEventTitle("");
        setGuestName("");
        setGuestDesignation("");
        setDescription("");
        setResources([]);
        setEventDates([{ date: "", startTime: "", endTime: "", venues: [""] }]);
        setEventType([]);
        setObjectives([""]);
        setGuests("");
        // Optional: Navigate away or show a success message
      } else {
        const errorData = await response.json();
        console.error(
          "Error saving event details:",
          errorData.message || "Unknown error"
        );
        // Optional: Set an error state to show user feedback
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      // Optional: Set an error state to show user feedback
    }
  };

  return (
    <div
      className={`w-full min-h-screen mx-auto p-8 rounded-lg shadow-md dark:bg-gray-700 dark:text-white bg-white text-gray-900`}
    >
      <h2 className="text-2xl font-bold mb-6">Event Request Form</h2>
      <form onSubmit={handleFormSubmit}>
        <motion.form
          onSubmit={handleFormSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Event Title */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Event Title
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </motion.div>

          {/* Event Type */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Event Type
            </label>
            <select
              value={eventType.length > 0 ? eventType[0] : ""}
              onChange={handleEventTypeChange}
              className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((event, index) => (
                <option key={index} value={event}>
                  {event}
                </option>
              ))}
            </select>

            {eventType[0] === "Other" && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label className="block font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300">
                  Please specify:
                </label>
                <input
                  type="text"
                  value={otherEvent}
                  onChange={handleOtherEventChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Enter event type"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </motion.div>
        </motion.form>

        {/*Event*/}
        <AnimatePresence>
          {eventDates.map((event, index) => (
            <motion.div
              key={index}
              className="mb-4 w-full border p-4 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layout
            >
              <div className="flex space-x-3">
                {/* Date */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventDates[0].date}
                    onChange={(e) =>
                      handleEventDateChange(0, "date", e.target.value)
                    }
                    min={formattedDate} // Set the min attribute to today's date to prevent selecting past dates
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-600"
                    required
                  />
                </div>

                {/* Start Time */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={event.startTime}
                    onChange={(e) =>
                      handleEventDateChange(index, "startTime", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-600"
                    required
                  />
                </div>

                {/* End Time */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={event.endTime}
                    onChange={(e) =>
                      handleEventDateChange(index, "endTime", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Venues */}
              <div className="mb-4">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Venue(s)
                </label>
                <AnimatePresence>
                  {event.venues.map((venue, venueIndex) => (
                    <motion.div
                      key={venueIndex}
                      className="flex flex-col mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      layout
                    >
                      <div className="flex items-center">
                        <select
                          value={venue}
                          onChange={(e) =>
                            handleVenueChange(index, venueIndex, e.target.value)
                          }
                          className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                          required
                        >
                          <option value="">Select Venue</option>
                          {venueOptions.map((venueOption) => (
                            <option key={venueOption} value={venueOption}>
                              {venueOption}
                            </option>
                          ))}
                        </select>
                        {event.venues.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVenue(index, venueIndex)}
                            className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Venue-specific form fields */}
                      {/* Classroom */}
                      {venue === "Classroom" && (
                        <div className="mt-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
                          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Select Classroom Numbers:
                          </label>
                          <div className="grid grid-cols-4 gap-4">
                            {validClassroomRanges.map((range) =>
                              Array.from(
                                { length: range.end - range.start + 1 },
                                (_, i) => {
                                  const classroomNumber = range.start + i;
                                  return (
                                    <div
                                      key={classroomNumber}
                                      className="flex items-center"
                                    >
                                      <input
                                        type="checkbox"
                                        id={`classroom-${classroomNumber}`}
                                        value={classroomNumber}
                                        checked={event.classroomVenues.includes(
                                          classroomNumber.toString()
                                        )}
                                        onChange={() =>
                                          handleClassroomChange(
                                            index,
                                            classroomNumber.toString()
                                          )
                                        }
                                        className="mr-2 dark:bg-gray-800 dark:border-gray-600"
                                      />
                                      <label
                                        htmlFor={`classroom-${classroomNumber}`}
                                        className="text-gray-700 dark:text-gray-300"
                                      >
                                        {classroomNumber}
                                      </label>
                                    </div>
                                  );
                                }
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Others */}
                      {venue === "Others" && (
                        <div className="mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Specify Other Venue:
                          </label>
                          <input
                            type="text"
                            value={event.otherVenue}
                            onChange={(e) =>
                              handleEventDateChange(
                                index,
                                "otherVenue",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                            placeholder="Enter venue"
                          />
                        </div>
                      )}

                      {/* LR */}
                      {venue === "LR" && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[150px]">
                              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Select Wing:
                              </label>
                              {["B-Wing", "C-Wing", "D-Wing"].map((wing) => (
                                <div
                                  key={wing}
                                  className="flex items-center mb-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={wing}
                                    checked={event.selectedWings.includes(wing)}
                                    onChange={() =>
                                      handleWingChange(index, wing)
                                    }
                                    className="mr-2 dark:bg-gray-800 dark:border-gray-600"
                                  />
                                  <label
                                    htmlFor={wing}
                                    className="text-gray-700 dark:text-gray-300"
                                  >
                                    {wing}
                                  </label>
                                </div>
                              ))}
                            </div>

                            {event.selectedWings.length > 0 && (
                              <div className="flex-1 min-w-[150px]">
                                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                  Select Floor:
                                </label>
                                {event.selectedWings.map((wing) =>
                                  floorOptions[wing]?.map((floor) => (
                                    <div
                                      key={floor}
                                      className="flex items-center mb-2"
                                    >
                                      <input
                                        type="checkbox"
                                        id={floor}
                                        checked={event.selectedFloors.includes(
                                          floor
                                        )}
                                        onChange={() =>
                                          handleFloorChange(index, floor)
                                        }
                                        className="mr-2"
                                      />
                                      <label
                                        htmlFor={floor}
                                        className="text-gray-700 dark:text-gray-300"
                                      >
                                        {floor}
                                      </label>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}

                            {event.selectedFloors.length > 0 && (
                              <div className="flex-1 min-w-[150px]">
                                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                  Select Room Number:
                                </label>
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] grid-rows-auto max-h-[400px] overflow-y-auto gap-2">
                                  {event.selectedFloors.map((floor) =>
                                    event.selectedWings.map((wing) =>
                                      roomOptions[wing]?.[floor]?.map(
                                        (room) => (
                                          <div
                                            key={room}
                                            className="min-w-[100px] flex items-center"
                                          >
                                            <input
                                              type="checkbox"
                                              id={room}
                                              checked={event.selectedRooms.includes(
                                                room
                                              )}
                                              onChange={() =>
                                                handleRoomChange(index, room)
                                              }
                                              className="mr-2 dark:bg-gray-800 dark:border-gray-600"
                                            />
                                            <label
                                              htmlFor={room}
                                              className="text-gray-700 dark:text-gray-300"
                                            >
                                              {room}
                                            </label>
                                          </div>
                                        )
                                      )
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => handleAddVenue(index)}
                  className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
                >
                  Add Venue
                </button>
              </div>

              {/* Conditionally render "Remove Event Date" button only if there's more than one event date */}
              {eventDates.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEventDate(index)}
                  className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg"
                >
                  Remove Event Date
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleAddEventDate}
          className="mt-2 mb-4 px-4 py-2 text-white bg-green-500 rounded-lg"
        >
          Add Event Date
        </button>

        {/* Objectives */}
        <div className="mb-4 w-full border p-4 rounded-md">
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Objectives
          </label>
          <AnimatePresence>
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                  className="w-11/12 mb-2 px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  required
                />
                {objectives.length > 3 && (
                  <motion.button
                    type="button"
                    onClick={() => removeObjective(index)}
                    className="ml-2 px-4 py-2 text-white bg-red-500 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Remove
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button
            type="button"
            onClick={addObjective}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mb-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Objective
          </motion.button>
        </div>

        {/* Schools */}
        <div className="mb-6 w-full border p-4 rounded-md">
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Target Audience
          </label>

          {/* Schools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Select Schools
            </label>
            <div className="flex flex-col">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="MPSTME"
                  checked={selectedSchools.includes("MPSTME")}
                  onChange={handleSchoolChange}
                  className="mr-2"
                />
                MPSTME
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="SPTM"
                  checked={selectedSchools.includes("SPTM")}
                  onChange={handleSchoolChange}
                  className="mr-2"
                />
                SPTM
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="SAST"
                  checked={selectedSchools.includes("SAST")}
                  onChange={handleSchoolChange}
                  className="mr-2"
                />
                SAST
              </label>
            </div>
          </motion.div>

          {/* Courses */}
          <AnimatePresence>
            {selectedSchools.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Select Courses
                </label>
                {selectedSchools.map((school) =>
                  courses[school].map((course) => (
                    <label key={course} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={course}
                        checked={selectedCourses.includes(course)}
                        onChange={handleCourseChange}
                        className="mr-2"
                      />
                      {course}
                    </label>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Branches */}
          <AnimatePresence>
            {selectedCourses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Select Branch
                </label>
                <div className="flex flex-col">
                  {selectedCourses.map((course) =>
                    branches[course].map((branch) => (
                      <label key={branch} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value={branch}
                          checked={selectedBranches.includes(branch)}
                          onChange={handleBranchChange}
                          className="mr-2"
                        />
                        {branch}
                      </label>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Year */}
          <AnimatePresence>
            {selectedBranches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Select Year
                </label>
                <div className="flex flex-col">
                  {years.map((year) => (
                    <label key={year} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={year}
                        checked={selectedYears.includes(year)}
                        onChange={handleYearChange}
                        className="mr-2"
                      />
                      {year}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {guests.map((guest, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md">
            {/* Guest Name */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Guest/Speaker Name
              </label>
              <input
                type="text"
                value={guest.name}
                onChange={(e) =>
                  handleGuestChange(index, "name", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                required
              />
            </motion.div>

            {/* Guest Designation */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Guest/Speaker Designation
              </label>
              <input
                type="text"
                value={guest.designation}
                onChange={(e) =>
                  handleGuestChange(index, "designation", e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                required
              />
            </motion.div>

            <button
              type="button"
              onClick={addGuest}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mb-4 mr-96"
            >
              Add Guest
            </button>

            {guests.length > 1 && (
              <button
                type="button"
                onClick={() => removeGuest(index)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg ml-96"
              >
                Remove Guest
              </button>
            )}
          </div>
        ))}

        {/* Audience */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Maximum Audience / Participation
          </label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            required
          />
        </motion.div>

        {/* Resources */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Resources Utilize (Provided by Faculty)
          </label>
          <input
            type="text"
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            required
          />
        </motion.div>

        {/* Clubs Collaborator */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Clubs Collaborator
          </label>

          <AnimatePresence>
            {clubs.length > 0 &&
              clubs.map((club, index) => (
                <motion.div
                  key={index}
                  className="flex items-center mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <select
                    value={club}
                    onChange={(e) => handleClubChange(e, index)}
                    className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    required
                  >
                    <option value="">Select Club</option>
                    {clubEvents.map((event, idx) => (
                      <option key={idx} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>

                  <motion.button
                    type="button"
                    onClick={() => handleRemoveClub(index)}
                    className="ml-2 px-4 py-2 text-white bg-red-500 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
          </AnimatePresence>

          <AnimatePresence>
            {clubs.includes("Others") && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <label className="block font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300">
                  Please specify:
                </label>
                <input
                  type="text"
                  value={otherClub}
                  onChange={handleOtherClub}
                  className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Enter Club Name"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Club Button */}
          <motion.button
            type="button"
            onClick={handleAddClub}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Club
          </motion.button>
        </motion.div>

        {/* Draft Button */}
        <motion.button
          type="button"
          className="flex ml-0 px-4 py-2 text-white bg-green-500 rounded-lg "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDraft}
        >
          Save As Draft
        </motion.button>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="flex ml-auto px-4 py-2 text-white bg-green-500 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>

        {formSubmitted && (
          <div className="mt-6 text-green-600 font-semibold">
            Form submitted successfully!
          </div>
        )}

        <TermsPopup
          show={showTerms}
          onClose={() => setShowTerms(false)}
          onAgree={() => {
            setShowTerms(false); // Close the popup
            handleFinalSubmit(); // Call the form submission function
          }}
        />
      </form>
    </div>
  );
};

export default RequestForm;
