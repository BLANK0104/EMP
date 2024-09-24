const db = require("../db"); // Import your database connection pool

// Function to fetch draft data by user ID
const getDraft = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available via authentication

  try {
    // Query to fetch the draft event for the current user
    const draftQuery = `
      SELECT 
        e.id,
        e.status,
        ed.event_dates,
        ed.school_audience,
        ed.clubs,
        ed.otherclub AS otherClub,  -- Use alias for clarity
        ed.otherevent AS otherEvent,  -- Use alias for clarity
        ed.resources,
        ed.objectives,
        ed.eventtype,
        ed.description,
        ed.guests,
        e.created_by
      FROM events e
      JOIN event_details ed ON e.id = ed.event_id
      WHERE e.status = 'Draft' AND e.created_by = $1
      ORDER BY e.created_at DESC
      LIMIT 1;
    `;

    const { rows } = await db.query(draftQuery, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Draft not found." });
    }

    const draft = rows[0];
    console.log(
      draft.id,
      draft.status,
      draft.event_dates,
      draft.school_audience,
      draft.clubs,
      draft.otherclub,
      draft.otherevent,
      draft.resources,
      draft.objectives,
      draft.eventtype,
      draft.description,
      draft.guests,
      draft.created_by
    );

    // Parse and structure the response data to match the frontend state
    const draftData = {
      selectedSchools: draft.school_audience?.school || [], // Assuming it's a nested object
      selectedCourses: draft.school_audience?.courses || [],
      selectedBranches: draft.school_audience?.branches || [],
      selectedYears: draft.school_audience?.years || [],
      audience: draft.school_audience?.audience || 0,
      eventTitle: draft.title || "",
      description: draft.description || "",
      resources: draft.resources || [],
      eventDates: draft.event_dates?.map((date) => ({
        date: date?.date || "",
        startTime: date?.start_time || "",
        endTime: date?.end_time || "",
        venues: date?.venues || [""],
        classroomVenues: date?.classroomVenues || [],
        otherVenue: date?.otherVenue || "",
        selectedWings: date?.selectedWings || [],
        selectedFloors: date?.selectedFloors || [],
      })) || [
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
      ],
      eventType: draft.eventtype || [],
      objectives: draft.objectives || ["", "", ""],
      otherEvent: draft.otherevent || "",
      otherClub: draft.otherclub || "",
      clubs: draft.clubs || [],
      guests: draft.guests || [{ name: "", designation: "" }],
    };

    // Send the structured response back to the client
    console.log(draftData);
    res.json(draftData);
  } catch (error) {
    console.error("Error fetching draft:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getDraft };
