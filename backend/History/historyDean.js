const db = require("../db");

const historyDean = async (userId) => {
    try {
        // SQL query to fetch club (username), event (title), status, date, and venue for a specific user
        const query = `
          SELECT 
            u.username AS club,
            ed.title AS event,
            es.status,
            (event_detail->>'date')::date AS date,
            event_detail->'venues' AS venue
          FROM 
            eventapprovals es
          JOIN 
            users u ON es.approver_id = u.id
          JOIN 
            events e ON es.event_id = e.id  -- Added this join to reference events table
          JOIN 
            event_details ed ON ed.event_id = e.id  -- Join on event_id between event_details and events
          JOIN 
            LATERAL jsonb_array_elements(ed.event_dates) AS event_detail ON true
          WHERE 
            es.status IN ('Pending', 'Approved', 'Modified', 'Rejected')  -- Corrected 'e.status' to 'es.status'
            AND u.id = $1;  -- Filter by user ID
        `;
    

    // Execute the query, passing the user ID as a parameter
    const result = await db.query(query, [userId]);

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

module.exports = historyDean;
