import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TermsPopup from "./Termspop";
import VenueDisplay from "./Venuedisplay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const venueOptions = [
  "A-Wing",
  "Amphitheater",
  "Auditorium",
  "B-Wing",
  "Central Fourier(CF)",
  "Classroom",
  "Conference Room",
  "Dance Room",
  "Drawing hall",
  "LR",
  "Music Room",
  "Playground",
  "Seminar hall",
  "Sobus",
  "Student Lounge",
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
  "AMBIORA-Technical Fest",
  "ATRANGI CLUB",
  "AVINYA-IOT LAB",
  "Coding Club",
  "Computer Society Of India(CSI)",
  "E-CELL",
  "EACH ONE SAVE ONE",
  "FLAVIUM",
  "IEEE",
  "INSTITATIONS INNOVATIONS COUNCIL(IIC)",
  "INSTITUE-INDUSTRY INTERACTION AND INTERSHIP CELL(I4C)",
  "IPR CELL",
  "Learn Tech with NMIMS Shirpur",
  "NMMUN(Narsee Monjee Model United Nation)",
  "NATIONAL INNOVATION AND START-UP POLICY CELL(NISP)",
  "PROTSAHAN",
  "RAW VISION CLUB",
  "Saturday 10AM",
  "Society 4DS",
  "TEAM UAS NMIMS (Drone Club)",
  "ISTE",
  "Others",
];

const RequestForm = () => {
  const [formState, setFormState] = useState({
    isInternal: false,
    isExternal: false,
    selectedSchools: [],
    selectedCourses: [],
    selectedBranches: [],
    selectedYears: [],
    externalInput: "",
  });
  const [audience, setAudience] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState([]);
  const [registration, setRegistration] = useState("");
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
  const [venueMessage, setVenueMessage] = useState(""); // State to store venue message
  const [isLoading, setIsLoading] = useState(false);
  const [venueDisplay, setVenueDisplay] = useState(false);

  const validClassroomRanges = [
    { start: 101, end: 104 },
    { start: 201, end: 203 },
  ];

  const floorOptions = {
    "B-Wing": ["Ground Floor", "First Floor", "Second Floor"],
    "C-Wing": ["First Floor", "Second Floor"],
    "D-Wing": ["Ground Floor"],
  };

  const roomOptions = {
    "B-Wing": {
      "Ground Floor": [1, 2, 3, 4, 5],
      "First Floor": [6, 7, 8, 9],
      "Second Floor": [10, 11, 12],
    },
    "C-Wing": {
      "First Floor": [13, 14, 15, 16],
      "Second Floor": [17, 18, 19],
    },
    "D-Wing": {
      "Ground Floor": [20, 21, 22, 23, 24],
    },
  };
  //Time Check function
  function isEndTimeBeforeStartTime(startTime, endTime) {
    // Create new Date objects for the start and end times
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Compare the two times
    return end < start;
  }

  // Available
  const handleAvailable = async (index, type) => {
    const event = eventDates[index]; // Access the event at the specified index
    const { date, startTime, endTime, venues } = event; // Destructure date, startTime, endTime, and venues

    // Ensure all required fields are provided
    if (!date || !startTime || !endTime || !venues.length) {
      alert(
        "Please enter date, time, and select a venue to check availability."
      );
      return;
    }

    // Validate time input
    if (isEndTimeBeforeStartTime(startTime, endTime)) {
      alert("End time should be after the start time.");
      return;
    }

    // Consolidate the venues based on user selection
    let consolidatedVenues = [...venues];

    // If "Classroom" is selected, add classroom-specific details
    if (consolidatedVenues.includes("Classroom")) {
      consolidatedVenues = consolidatedVenues.concat(
        event.classroomVenues.map((room) => `Classroom - ${room}`)
      );
    }

    // If "Others" is selected, include the "otherVenue" details
    if (consolidatedVenues.includes("Others") && event.otherVenue) {
      consolidatedVenues.push(event.otherVenue);
    }

    // If "LR" is selected, include specific room details for LR
    if (consolidatedVenues.includes("LR")) {
      consolidatedVenues = consolidatedVenues.concat(
        event.selectedRooms.map((room) => `LR - ${room}`)
      );
    }

    // Filter out base venue types from the final list
    consolidatedVenues = consolidatedVenues.filter(
      (venue) => venue !== "Classroom" && venue !== "Others" && venue !== "LR"
    );

    // Parse the date to 'yyyy-mm-dd' format
    const parsedDate = new Date(date).toLocaleDateString("en-CA"); // 'yyyy-mm-dd'

    try {
      // Make a POST request to check venue availability
      const response = await fetch(`${backendUrl}/check-venue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date: parsedDate,
          startTime,
          endTime,
          venues: consolidatedVenues, // Use consolidated venues
        }),
      });

      const data = await response.json();
      console.log(data); // Log data for debugging

      let message = "";

      // Handle button click case
      if (type === "button") {
        // Prepare message for both available and conflicting venues

        // Check for conflicting venues
        if (data.conflictingVenues && data.conflictingVenues.length > 0) {
          message += "Conflicting Venues:\n";
          data.conflictingVenues.forEach((conflict) => {
            message += `- Venue: ${conflict.venue}, Status: ${conflict.status}\n`;
          });
        } else {
          message += "No venue conflicts found.\n";
        }

        // Check for available venues
        if (data.availableVenues && data.availableVenues.length > 0) {
          message += "\nAvailable Venues:\n";
          data.availableVenues.forEach((venue) => {
            message += `- Venue: ${venue}\n`;
          });
        }

        // Display the message to the user
        setVenueMessage(message);
        setVenueDisplay(true);
      }
      // Handle form submit case
      else if (type === "submit") {
        if (data.conflictingVenues && data.conflictingVenues.length > 0) {
          // Show conflicting venues and prevent submission
          message += "Conflicting Venues:\n";
          data.conflictingVenues.forEach((conflict) => {
            message += `- Venue: ${conflict.venue}, Status: ${conflict.status}\n`;
          });

          setVenueMessage(message);
          setVenueDisplay(true);
          return true; // Return true to indicate a clash
        } else {
          return false; // No clash, proceed with submission
        }
      }
    } catch (error) {
      console.error("Error checking venue availability:", error);
      alert("An error occurred while checking venue availability.");
    }
  };

  const handleVenueChange = (dateIndex, venueIndex, value) => {
    const updatedDates = [...eventDates];
    const event = updatedDates[dateIndex];
    updatedDates[dateIndex].venues[venueIndex] = value;

    // Check and clear data only if necessary
    if (value === "Classroom") {
      // Reset classroom venues only if the previous venue was Classroom
      if (event.venues[venueIndex] === "Classroom") {
        updatedDates[dateIndex].classroomVenues = [];
      }
    }

    if (value === "Others") {
      // Reset other venue only if the previous venue was Others
      if (event.venues[venueIndex] === "Others") {
        updatedDates[dateIndex].otherVenue = "";
      }
    }

    if (value === "LR") {
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

  const handleClassroomSelectAll = (dateIndex) => {
    const updatedDates = [...eventDates];

    // Get all classroom numbers from validClassroomRanges
    const allClassrooms = validClassroomRanges.flatMap((range) =>
      Array.from({ length: range.end - range.start + 1 }, (_, i) =>
        (range.start + i).toString()
      )
    );

    const { classroomVenues } = updatedDates[dateIndex];

    // Check if all classrooms are already selected
    const allSelected = allClassrooms.every((classroom) =>
      classroomVenues.includes(classroom)
    );

    if (allSelected) {
      // Deselect all classrooms
      updatedDates[dateIndex].classroomVenues = [];
    } else {
      // Select all classrooms
      updatedDates[dateIndex].classroomVenues = allClassrooms;
    }

    setEventDates(updatedDates);
  };

  // Function to select/deselect all wings, floors, and rooms
  const handleSelectAll = (dateIndex) => {
    const updatedDates = [...eventDates];
    const allWings = ["B-Wing", "C-Wing", "D-Wing"];

    // Get all possible floors for selected wings
    const allFloors = Array.from(
      new Set(allWings.flatMap((wing) => floorOptions[wing] || []))
    );

    // Get all possible rooms for selected wings and floors
    const allRooms = Array.from(
      new Set(
        allFloors.flatMap((floor) =>
          allWings.flatMap((wing) => roomOptions[wing]?.[floor] || [])
        )
      )
    );

    const { selectedWings, selectedFloors, selectedRooms } =
      updatedDates[dateIndex];

    // If everything is already selected, deselect all
    if (
      selectedWings.length === allWings.length &&
      selectedFloors.length === allFloors.length &&
      selectedRooms.length === allRooms.length
    ) {
      updatedDates[dateIndex].selectedWings = [];
      updatedDates[dateIndex].selectedFloors = [];
      updatedDates[dateIndex].selectedRooms = [];
    } else {
      // Select all wings, floors, and rooms
      updatedDates[dateIndex].selectedWings = allWings;
      updatedDates[dateIndex].selectedFloors = allFloors;
      updatedDates[dateIndex].selectedRooms = allRooms;
    }

    setEventDates(updatedDates);
  };

  const handleWingChange = (dateIndex, wing) => {
    const updatedDates = [...eventDates];
    const { selectedWings } = updatedDates[dateIndex];

    // Toggle wing selection
    if (selectedWings.includes(wing)) {
      updatedDates[dateIndex].selectedWings = selectedWings.filter(
        (w) => w !== wing
      );
    } else {
      updatedDates[dateIndex].selectedWings = [...selectedWings, wing];
    }

    // Reset floors and rooms when wings change
    updatedDates[dateIndex].selectedFloors = [];
    updatedDates[dateIndex].selectedRooms = [];

    setEventDates(updatedDates);
  };

  const handleFloorChange = (dateIndex, floor) => {
    const updatedDates = [...eventDates];
    const { selectedFloors, selectedWings } = updatedDates[dateIndex];

    // Toggle floor selection
    if (selectedFloors.includes(floor)) {
      updatedDates[dateIndex].selectedFloors = selectedFloors.filter(
        (f) => f !== floor
      );
    } else {
      updatedDates[dateIndex].selectedFloors = [...selectedFloors, floor];
    }

    // Reset rooms when floors change
    updatedDates[dateIndex].selectedRooms = [];

    setEventDates(updatedDates);
  };

  const handleRoomChange = (dateIndex, room) => {
    const updatedDates = [...eventDates];
    const { selectedRooms } = updatedDates[dateIndex];

    // Toggle room selection and keep the list sorted in descending order
    if (selectedRooms.includes(room)) {
      updatedDates[dateIndex].selectedRooms = selectedRooms
        .filter((r) => r !== room)
        .sort((a, b) => b - a);
    } else {
      updatedDates[dateIndex].selectedRooms = [...selectedRooms, room].sort(
        (a, b) => b - a
      );
    }

    setEventDates(updatedDates);
  };

  // Check if everything is selected
  const isAllSelected = (dateIndex) => {
    const allWings = ["B-Wing", "C-Wing", "D-Wing"];
    const allFloors = Array.from(
      new Set(allWings.flatMap((wing) => floorOptions[wing] || []))
    );
    const allRooms = Array.from(
      new Set(
        allFloors.flatMap((floor) =>
          allWings.flatMap((wing) => roomOptions[wing]?.[floor] || [])
        )
      )
    );

    const { selectedWings, selectedFloors, selectedRooms } =
      eventDates[dateIndex];

    return (
      selectedWings.length === allWings.length &&
      selectedFloors.length === allFloors.length &&
      selectedRooms.length === allRooms.length
    );
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
    console.log("update:", updatedDates);
    setEventDates(updatedDates);
  };

  const handleAddVenue = (dateIndex) => {
    const updatedDates = [...eventDates];
    updatedDates[dateIndex].venues.push([]);
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
    MBATech: ["CE"],
    BPharmaMBA: ["BPharma + MBA"],
    MPharmaMBA: ["MPharma + MBA"],
    BPharma: ["B.Pharma"],
    MPharma: ["M.Pharma"],
    Agriculture: ["AGRICULTURE"],
  };

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const handleSchoolChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      selectedSchools: checked
        ? [...prevState.selectedSchools, value]
        : prevState.selectedSchools.filter((school) => school !== value),
      selectedCourses: [], // Reset courses and branches when schools change
      selectedBranches: [],
      selectedYears: [],
    }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      selectedCourses: checked
        ? [...prevState.selectedCourses, value]
        : prevState.selectedCourses.filter((course) => course !== value),
      selectedBranches: [], // Reset branches when courses change
    }));
  };

  const handleBranchChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      selectedBranches: checked
        ? [...prevState.selectedBranches, value]
        : prevState.selectedBranches.filter((branch) => branch !== value),
    }));
  };

  const handleYearChange = (e) => {
    const { value, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      selectedYears: checked
        ? [...prevState.selectedYears, value]
        : prevState.selectedYears.filter((year) => year !== value),
    }));
  };

  const handleInternalChange = (checked) => {
    setFormState((prevState) => ({
      ...prevState,
      isInternal: checked,
      selectedSchools: [], // Clear selections if Internal is selected
      selectedCourses: [],
      selectedBranches: [],
      selectedYears: [],
    }));
  };

  const handleExternalChange = (checked) => {
    setFormState((prevState) => ({
      ...prevState,
      isExternal: checked,
      selectedSchools: [], // Clear selections if External is selected
      selectedCourses: [],
      selectedBranches: [],
      selectedYears: [],
    }));
  };

  const handleBothChange = (checked) => {
    setFormState((prevState) => ({
      ...prevState,
      isInternal: checked,
      isExternal: checked, // Set External to true as well
      selectedSchools: [], // Clear selections if Both is selected
      selectedCourses: [],
      selectedBranches: [],
      selectedYears: [],
    }));
  };

  const handleSelectAllSchools = (checked) => {
    if (checked) {
      setFormState((prevState) => ({
        ...prevState,
        selectedSchools: ["MPSTME", "SPTM", "SAST"], // Select all schools
        selectedCourses: Object.values(courses).flat(), // Select all courses
        selectedBranches: Object.values(branches).flat(), // Select all branches
        selectedYears: years, // Select all years
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        selectedSchools: [],
        selectedCourses: [],
        selectedBranches: [],
        selectedYears: [],
      }));
    }
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
      guests: JSON.stringify(
        guests.map((guest) => ({
          name: guest.name,
          designation: guest.designation,
        }))
      ),
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
    // Consolidate venues and other relevant data
    setIsLoading(true);

    try {
      const finalEventDates = await Promise.all(
        eventDates.map(async (event, index) => {
          let consolidatedVenues = [...event.venues]; // Start with the venues

          // Check for valid time inputs
          if (isEndTimeBeforeStartTime(event.startTime, event.endTime)) {
            alert("End time can't be before Start time!!");
            setIsLoading(false); // Stop loading spinner on error
            return null; // Return null to indicate an invalid entry
          }

          // Check for venue availability
          if (await handleAvailable(index, "submit")) {
            setIsLoading(false); // Stop loading spinner on error
            return null; // Return null to indicate a clash
          }

          // Handle special venue types
          if (event.venues.includes("Classroom")) {
            consolidatedVenues = consolidatedVenues.concat(
              event.classroomVenues.map((room) => `Classroom - ${room}`)
            );
          }
          if (event.venues.includes("Others") && event.otherVenue) {
            consolidatedVenues.push(`${event.otherVenue}`);
          }
          if (event.venues.includes("LR")) {
            consolidatedVenues = consolidatedVenues.concat(
              event.selectedRooms.map((room) => `LR - ${room}`)
            );
          }

          // Filter out base venue types ("Classroom", "Others", "LR")
          consolidatedVenues = consolidatedVenues.filter(
            (venue) =>
              venue !== "Classroom" && venue !== "Others" && venue !== "LR"
          );

          // Format the date
          const formattedDate = new Date(event.date)
            .toISOString()
            .split("T")[0];

          return {
            ...event,
            date: formattedDate, // Format date to "YYYY-MM-DD"
            venues: consolidatedVenues, // Overwrite with consolidated venues
          };
        })
      );

      // Filter out null entries (conflicting or invalid events)
      const validEventDates = finalEventDates.filter((event) => event !== null);

      if (validEventDates.length === 0) {
        alert("Form submission aborted due to conflicting or invalid events.");
        return;
      }

      // Consolidate event types (including "Other" event type if provided)
      let consolidatedEventType = [...eventType];
      if (eventType.includes("Other") && otherEvent) {
        consolidatedEventType = consolidatedEventType.map((type) =>
          type === "Other" ? otherEvent : type
        );
      }

      // Consolidate clubs (including "Other" club if provided)
      let consolidatedClubs = [...clubs];
      if (clubs.includes("Others") && otherClub) {
        consolidatedClubs = consolidatedClubs.map((club) =>
          club === "Others" ? otherClub : club
        );
      }

      // Prepare formData object
      const formData = {
        eventTitle,
        description,
        audience: parseInt(audience, 10),
        resources: JSON.stringify(resources),
        clubs: consolidatedClubs, // Final clubs array
        eventType: consolidatedEventType, // Final event type array
        objectives: objectives,
        guests: JSON.stringify(
          guests.map((guest) => ({
            name: guest.name,
            designation: guest.designation,
          }))
        ),
        registration,
        eventDates: JSON.stringify(
          validEventDates.map((event) => ({
            date: event.date, // Use formatted date
            start_time: event.startTime,
            end_time: event.endTime,
            venues: event.venues, // Use consolidated and filtered venues
          }))
        ),
        school_audience: JSON.stringify({
          school: formState.selectedSchools,
          branch: formState.selectedCourses,
          class: formState.selectedBranches,
          year: formState.selectedYears,
          externalInput: formState.externalInput,
        }),
      };

      console.log(formData); // Debugging: Check if formData is correct

      const response = await fetch(`${backendUrl}/event-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Sends cookies with the request
        body: JSON.stringify(formData), // Convert formData to JSON string
      });

      const data = await response.json();
      console.log("Response data: ", data); // Debugging: Check if data is correct

      if (response.status === 201) {
        setFormSubmitted(true);
        window.location.reload(); // Optional: Reload the page or navigate
      } else {
        const errorData = await response.json();
        console.error(
          "Error saving event details:",
          errorData.message || "Unknown error"
        );
        alert(
          "An error occurred while submitting the event. Please try again."
        );
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop the loading spinner in all cases
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      alert("Form Submitted Successfully!!");
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  return (
    <div
      className={`w-full min-h-screen p-4 sm:p-6 md:p-8 rounded-lg shadow-md dark:bg-gray-700 dark:text-white bg-white text-gray-900`}
    >
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-10 h-10 border-4 border-gray-600 dark:border-gray-200 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Event Request Form
      </h2>
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
              Event Title *
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter Event Title"
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
              Event Type *
            </label>
            <select
              value={eventType.length > 0 ? eventType[0] : ""}
              onChange={handleEventTypeChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
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
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  placeholder="Enter event type"
                  required
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
              Description *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              placeholder="Enter Description"
              required
            />
          </motion.div>
        </motion.form>

        {/* Event */}
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
              <div className="flex flex-wrap items-end -mx-2 mb-2">
                {/* Date */}
                <div className="w-full sm:w-auto px-2 mb-4 sm:mb-0">
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Date *
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={event.date}
                      onChange={(date) => {
                        // Set time to 00:00:00 in UTC to avoid time zone issues
                        const utcDate = new Date(
                          Date.UTC(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                          )
                        );

                        // Use the UTC-adjusted date when setting the event date
                        handleEventDateChange(index, "date", utcDate);
                      }}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      className="w-40 px-8 py-2 border rounded-lg bg-white dark:bg-gray-600"
                      required
                    />

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-black dark:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Start Time */}
                <div className="w-1/2 sm:w-28 px-2 mb-4 sm:mb-0">
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={event.startTime}
                    onChange={(e) => {
                      handleEventDateChange(index, "startTime", e.target.value);
                    }}
                    className="w-full px-2 py-2 border rounded-lg bg-white dark:bg-gray-600"
                    required
                  />
                </div>

                {/* End Time */}
                <div className="w-1/2 sm:w-28 px-2 mb-4 sm:mb-0">
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={event.endTime}
                    onChange={(e) => {
                      handleEventDateChange(index, "endTime", e.target.value);
                    }}
                    className="w-full px-2 py-2 border rounded-lg bg-white dark:bg-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Venues */}
              <div className="mb-4">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Venue(s) *
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

                          {/* Select All Checkbox */}
                          <div className="flex items-center mb-4">
                            <input
                              type="checkbox"
                              id="select-all-classrooms"
                              checked={validClassroomRanges.every((range) =>
                                Array.from(
                                  { length: range.end - range.start + 1 },
                                  (_, i) => range.start + i
                                ).every((classroomNumber) =>
                                  event.classroomVenues.includes(
                                    classroomNumber.toString()
                                  )
                                )
                              )}
                              onChange={() => handleClassroomSelectAll(index)}
                              className="mr-2 dark:bg-gray-800 dark:border-gray-600"
                            />
                            <label
                              htmlFor="select-all-classrooms"
                              className="text-gray-700 dark:text-gray-300"
                            >
                              All
                            </label>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Select Wing */}
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

                              {/* Select All Wings, Floors, and Rooms */}
                              <div className="flex items-center mt-2">
                                <input
                                  type="checkbox"
                                  id="selectAll"
                                  checked={isAllSelected(index)} // Function to check if everything is selected
                                  onChange={() => handleSelectAll(index)} // Function to select/deselect all
                                  className="mr-2 dark:bg-gray-800 dark:border-gray-600"
                                />
                                <label
                                  htmlFor="selectAll"
                                  className="text-gray-700 dark:text-gray-300"
                                >
                                  All
                                </label>
                              </div>
                            </div>

                            {/* Select Floor */}
                            {event.selectedWings.length > 0 && (
                              <div className="flex-1 min-w-[150px]">
                                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                  Select Floor:
                                </label>
                                {Array.from(
                                  new Set(
                                    event.selectedWings.flatMap(
                                      (wing) => floorOptions[wing] || []
                                    )
                                  )
                                ).map((floor) => (
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
                                ))}
                              </div>
                            )}

                            {/* Select Room Number */}
                            {event.selectedFloors.length > 0 && (
                              <div className="flex-1 min-w-[150px]">
                                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                  Select Room Number:
                                </label>
                                <div className="grid grid-cols-3 max-h-[400px] overflow-y-auto gap-2">
                                  {event.selectedFloors.map((floor) =>
                                    event.selectedWings.map((wing) =>
                                      roomOptions[wing]?.[floor]
                                        ?.slice(0, 24)
                                        .map((room) => (
                                          <div
                                            key={room}
                                            className="flex items-center"
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
                                        ))
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
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => handleAddVenue(index)}
                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg"
                  >
                    Add Venue
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAvailable(index, "button")}
                    className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg"
                  >
                    Check Availability
                  </button>

                  <VenueDisplay
                    show={venueDisplay}
                    onClose={() => setVenueDisplay(false)}
                    onAgree={() => {
                      setVenueDisplay(false); // Close the popup
                    }}
                    venueMessage={venueMessage}
                  />
                </div>
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
            Objectives *
          </label>
          <AnimatePresence>
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) =>
                      handleObjectiveChange(index, e.target.value)
                    }
                    className="flex-grow mb-2 px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    placeholder="Enter Objective"
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
                </div>
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

          {/* Internal, External, Both Checkboxes */}
          <div className="flex flex-col mb-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={formState.isInternal}
                onChange={(e) => handleInternalChange(e.target.checked)}
                className="mr-2"
              />
              Internal
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={formState.isExternal}
                onChange={(e) => handleExternalChange(e.target.checked)}
                className="mr-2"
              />
              External
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={formState.isInternal && formState.isExternal} // Both is true if both are true
                onChange={(e) => handleBothChange(e.target.checked)}
                className="mr-2"
              />
              Both
            </label>
          </div>

          {/* Schools */}
          {formState.isInternal && (
            <div className="flex justify-between">
              {/* Schools */}
              <motion.div className="w-1/4">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Select Schools
                </label>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={formState.selectedSchools.length === 3} // Check if all schools are selected
                    onChange={(e) => handleSelectAllSchools(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Select All</span>
                </div>
                <div className="flex flex-col">
                  {["MPSTME", "SPTM", "SAST"].map((school) => (
                    <label key={school} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={school}
                        checked={formState.selectedSchools.includes(school)}
                        onChange={handleSchoolChange}
                        className="mr-2"
                      />
                      {school}
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Courses */}
              <AnimatePresence>
                {formState.selectedSchools.length > 0 && (
                  <motion.div className="w-1/4">
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Select Courses
                    </label>
                    {formState.selectedSchools.map((school) =>
                      courses[school].map((course) => (
                        <label key={course} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            value={course}
                            checked={formState.selectedCourses.includes(course)}
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
                {formState.selectedCourses.length > 0 && (
                  <motion.div className="w-1/4">
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Select Branch
                    </label>
                    <div className="flex flex-col">
                      {
                        // Flatten the branches and filter out duplicates
                        [
                          ...new Set(
                            formState.selectedCourses.flatMap(
                              (course) => branches[course]
                            )
                          ),
                        ].map((branch) => (
                          <label
                            key={branch}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="checkbox"
                              value={branch}
                              checked={formState.selectedBranches.includes(
                                branch
                              )}
                              onChange={handleBranchChange}
                              className="mr-2"
                            />
                            {branch}
                          </label>
                        ))
                      }
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Year */}
              <AnimatePresence>
                {formState.selectedBranches.length > 0 && (
                  <motion.div className="w-1/4">
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Select Year
                    </label>
                    <div className="flex flex-col">
                      {years.map((year) => (
                        <label key={year} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            value={year}
                            checked={formState.selectedYears.includes(year)}
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
          )}

          {/* External Input */}
          {formState.isExternal && (
            <div className="mt-4">
              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
                External Input
              </label>
              <input
                type="text"
                value={formState.externalInput}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    externalInput: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                placeholder="Enter external information"
              />
            </div>
          )}
        </div>

        <div className=" font-bold text-md font-serif p-2">
          If any Guest Speaker :{" "}
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
                placeholder="Enter Guest/Speaker Name"
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
                placeholder="Enter Guest/Speaker Designation"
              />
            </motion.div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={addGuest}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Add Guest
              </button>

              {guests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGuest(index)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg"
                >
                  Remove Guest
                </button>
              )}
            </div>
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
            Expected Number Of Audience / Participation *
          </label>
          <input
            type="number" // Keeps the input type as number
            value={audience}
            onChange={(e) => {
              const value = e.target.value;
              // Update state only if value is a positive integer
              if (value === "" || parseInt(value, 10) >= 0) {
                setAudience(value);
              }
            }}
            min="0" // Prevents negative values
            className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 appearance-none" // Add appearance-none
            required
            placeholder="Enter Expected Number Of Audience / Participation"
            style={{
              MozAppearance: "textfield", // Firefox
              WebkitAppearance: "none", // Chrome/Safari
            }}
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
            placeholder="Enter Resources Utilize (Provided by Faculty)"
          />
        </motion.div>

        {/*Registration Link*/}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Registration (If available) :
          </label>
          <input
            type="url"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            placeholder="Enter registration link"
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
            {clubs.length > 0 ? (
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
              ))
            ) : (
              <p className="text-red-500 p-1 font-medium text-base">
                No club added
              </p>
            )}
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
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Club
          </motion.button>
        </motion.div>

        {/* Buttons Container */}
        <div className="flex justify-between mt-4">
          {/* Submit Button */}
          <motion.button
            type="submit"
            className="flex px-4 py-2 text-white bg-green-500 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </div>

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
