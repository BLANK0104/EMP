const db = require("../db");

const historyDirector = async (userId) => {
  try {
    // SQL query to fetch club (username), event (title), status, date, and venue for a specific user
    const query = `
      SELECT 
    u.username AS club,
    ed.title AS event,
    e.status,
    (event_detail->>'date')::date AS date,
    event_detail->'venues' AS venue
FROM 
    events e
JOIN 
    users u ON e.created_by = u.id
JOIN 
    event_details ed ON ed.event_id = e.id
-- Unpack event_dates only once for better readability and performance
JOIN 
    LATERAL jsonb_array_elements(ed.event_dates) AS event_detail ON true
WHERE 
    e.status IN ('Approved', 'Modified', 'Rejected')

    `;

    // Execute the query, passing the user ID as a parameter
    const result = await db.query(query, []);

    // Format the data to render venues as a comma-separated string
    const formattedData = result.rows.map((row) => ({
      club: row.club,
      event: row.event,
      status: row.status,
      date: row.date,
      venue: row.venue.map((v) => v).join(", "), // Convert JSON array of venues to string
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw new Error("Failed to fetch history data");
  }
};

module.exports = historyDirector;
