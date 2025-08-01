const db = require("../db");

const historyDean = async (userId) => {
    try {
        const query = `
          SELECT 
            u.username AS club,
            ed.title AS event,
            es.status,
            e.id as event_id,
            (event_detail->>'date')::date AS date,
            event_detail->'venues' AS venue,
            er.file_path as pdf_file_path
          FROM 
            eventapprovals es
          JOIN 
            users u ON es.approver_id = u.id
          JOIN 
            events e ON es.event_id = e.id
          JOIN 
            event_details ed ON ed.event_id = e.id
          LEFT JOIN
            event_reports er ON er.event_id = e.id
          JOIN 
            LATERAL jsonb_array_elements(ed.event_dates) AS event_detail ON true
          WHERE 
            es.status IN ('Pending', 'Approved', 'Modified', 'Rejected')
            AND u.id = $1
          ORDER BY es.created_at DESC
        `;

    const result = await db.query(query, [userId]);

    const formattedData = result.rows.map((row) => ({
      club: row.club,
      event: row.event,
      status: row.status,
      event_id: row.event_id,
      date: row.date,
      venue: row.venue.map((v) => v).join(", "),
      pdf_file_path: row.pdf_file_path
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching history data:", error);
    throw new Error("Failed to fetch history data");
  }
};

module.exports = historyDean;
