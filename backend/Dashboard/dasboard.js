const db = require("../db");

const dashboard = async (id, role) => {
  console.log(id);
  try {
    // Fetch username (if needed)
    const usernameResult = await db.query(
      "SELECT username FROM users WHERE id = $1",
      [id]
    );
    const username = usernameResult.rows[0]?.username; // Handle case where username is not found

    // Fetch event statuses and dates
    const eventStatusQuery = `
      SELECT 
        e.status,
        e.id AS event_id,
        ed.event_dates->0->>'date' AS event_date  
      FROM 
        events e
      JOIN 
        event_details ed 
      ON 
        e.id = ed.event_id
      WHERE 
        e.created_by = $1;
    `;

    const response = await db.query(eventStatusQuery, [id]);
    const data = response.rows;

    // Query for upcoming events with organizer, date range, and venue
    const upcomingEventsQuery = `
  SELECT
  ed.event_id,
    ed.title AS event_title,
    us.username AS organizer,
    CASE 
      WHEN jsonb_array_length(ed.event_dates) > 1 THEN 
        CONCAT(
          TO_CHAR(TO_DATE(ed.event_dates->0->>'date', 'YYYY-MM-DD'), 'DD/MM/YYYY'),
          ' - ',
          TO_CHAR(TO_DATE(ed.event_dates->jsonb_array_length(ed.event_dates) - 1->>'date', 'YYYY-MM-DD'), 'DD/MM/YYYY')
        )
      ELSE 
        TO_CHAR(TO_DATE(ed.event_dates->0->>'date', 'YYYY-MM-DD'), 'DD/MM/YYYY')
    END AS event_date_range,
    ed.event_dates->0->>'start_time' AS start_time,
    ed.event_dates->0->>'venues' AS venue
  FROM 
    events AS e
  JOIN 
    users AS us ON e.created_by = us.id
  JOIN 
    event_details AS ed ON e.id = ed.event_id
  WHERE 
    TO_DATE(ed.event_dates->0->>'date', 'YYYY-MM-DD') >= CURRENT_DATE
  ORDER BY 
    e.id DESC;
`;

    const upcomingEventsResponse = await db.query(upcomingEventsQuery, []);
    const upcomingEvents = upcomingEventsResponse.rows;
    console.log(upcomingEvents);

    const latestEventQuery = `
      SELECT e.id, e.status, us.username
      FROM events AS e
      JOIN users AS us ON e.current_approver = us.id
      WHERE e.created_by = $1
      ORDER BY e.created_at DESC
      LIMIT 1;
    `;

    const latest = await db.query(latestEventQuery, [id]);
    const latestData = latest.rows[0];

    // Return the fetched event data to be sent in API response
    return { data, username, latestData, upcomingEvents };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error; // Re-throw the error to be handled by the route handler or middleware
  }
};

module.exports = dashboard;
