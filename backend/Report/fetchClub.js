const db = require('../db');

async function getReportAndUsernameByEventId(eventId) {
  console.log("Event ID:", eventId); // Log the eventId to check its value

  const query = `
    SELECT r.*, u.username
    FROM report r
    JOIN events e ON r.event_id = e.id
    JOIN users u ON e.created_by = u.id
    WHERE r.event_id = $1
  `;
  
  try {
    console.log("Executing query:", query);
    console.log("With parameters:", [eventId]);
    const result = await db.query(query, [eventId]); // Execute the query with eventId as a parameter
    console.log("Query result:", result);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error.message); // Log any errors
    throw error; // Propagate the error
  }
}

module.exports = getReportAndUsernameByEventId;