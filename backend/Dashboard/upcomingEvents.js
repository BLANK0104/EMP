const db = require("../db");

const upcomingEvents = async () => {
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
        TO_CHAR(TO_DATE((ed.event_dates->jsonb_array_length(ed.event_dates) - 1)->>'date', 'YYYY-MM-DD'), 'DD/MM/YYYY')
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
  AND e.status = 'Approved'
ORDER BY 
  e.id DESC;

`;

  const upcomingEventsResponse = await db.query(upcomingEventsQuery, []);
  const upcomingEvents = upcomingEventsResponse.rows;
//   console.log("upcoming", upcomingEvents);
  return upcomingEvents;
};

module.exports = upcomingEvents;
