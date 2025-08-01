const db = require("../db");

const history = async (userId) => {
  try {
    // SQL query to fetch club (username), event (title), status, date, venue, and PDF file path for a specific user
    const query = `
      SELECT 
        u.username AS club,
        ed.title AS event,
        e.status,
        e.id as event_id,
        (event_detail->>'date')::date AS date,
        event_detail->'venues' AS venue,
        er.file_path as pdf_file_path
      FROM 
        events e
      JOIN 
        users u ON e.created_by = u.id
      JOIN 
        event_details ed ON ed.event_id = e.id
      LEFT JOIN
        event_reports er ON er.event_id = e.id
      JOIN 
        LATERAL jsonb_array_elements(ed.event_dates) AS event_detail ON true
      WHERE 
        e.status IN ('Approved', 'Modified', 'Rejected')
        AND u.id = $1
      ORDER BY e.created_at DESC
    `;

    // Execute the query, passing the user ID as a parameter
    const result = await db.query(query, [userId]);

    // Format the data to render venues as a comma-separated string
    const formattedData = result.rows.map((row) => ({
      club: row.club,
      event: row.event,
      status: row.status,
      event_id: row.event_id,
      date: row.date,
      venue: row.venue.map((v) => v).join(", "), // Convert JSON array of venues to string
      pdf_file_path: row.pdf_file_path
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw new Error("Failed to fetch history data");
  }
};

module.exports = history;
