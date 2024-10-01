const db = require("../db");

const Available = async (date, startTime, endTime, venues, req, res) => {
  // Log venues to check if they're received correctly
  console.log("Received venues:", venues);

  // Ensure venues is an array
  if (!Array.isArray(venues)) {
    return res.status(400).json({ error: "Venues should be an array" });
  }

  // SQL query to get events that overlap with the selected date and time for the specific venues
  const checkVenueQuery = `
    SELECT 
    event_detail->>'venues' AS venue,
    e.status,
    COUNT(*) FILTER (WHERE e.status = 'Pending') AS pending_count
FROM 
    event_details ed
JOIN 
    jsonb_array_elements(ed.event_dates) AS event_detail ON TRUE
JOIN 
    events e ON ed.event_id = e.id
WHERE 
    event_detail->>'date' = $1  
    AND (
        ($2 BETWEEN event_detail->>'start_time' AND event_detail->>'end_time')
        OR ($3 BETWEEN event_detail->>'start_time' AND event_detail->>'end_time')
        OR (event_detail->>'start_time' BETWEEN $2 AND $3)
    )
    AND EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(event_detail->'venues') AS v
        WHERE v = ANY($4)
    )
GROUP BY 
    venue, e.status;
  `;

  try {
    const params = [date, startTime, endTime, venues];
    console.log("Query Parameters:", params);

    const result = await db.query(checkVenueQuery, params);

    console.log("result: ", result.rows);

    const conflictingVenues = result.rows.map((row) => ({
      venue: row.venue,
      status: row.status,
      pending_count: row.pending_count,
    }));

    // Filter out venues that are already approved or pending
    const availableVenues = venues.filter((requestedVenue) => {
      return !conflictingVenues.some((conflict) => {
        let conflictVenue = conflict.venue;

        // Parse the conflictVenue only if it's a JSON string
        if (conflictVenue.startsWith("[")) {
          try {
            conflictVenue = JSON.parse(conflictVenue);
          } catch (e) {
            console.error("Error parsing venue:", conflict.venue);
            return false;
          }
        }

        // Check if the conflictVenue is an array and includes the requested venue
        if (Array.isArray(conflictVenue)) {
          return (
            conflictVenue.includes(requestedVenue) &&
            (conflict.status === "Approved" || conflict.status === "Pending")
          );
        }

        // Otherwise, just compare the string directly
        return (
          conflictVenue === requestedVenue &&
          (conflict.status === "Approved" || conflict.status === "Pending")
        );
      });
    });

    console.log("Available Venues:", availableVenues);
    console.log("Conflicting Venues:", conflictingVenues);

    return res.json({
      availableVenues,
      conflictingVenues,
    });
  } catch (error) {
    console.error("Error fetching available venues:", error);
    return res.status(500).json({
      error: "An error occurred while checking venue availability.",
    });
  }
};

module.exports = Available;
