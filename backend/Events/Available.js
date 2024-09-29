const db = require("../db");

const Available = async (id, venue, eventDateTime) => {
  const checkVenueQuery = `
    SELECT COUNT(*) as count
    FROM events
    WHERE venue = $1 AND event_date_time = $2
  `;

  const result = await db.query(checkVenueQuery, [venue, eventDateTime]);

  if (result.rows[0].count > 0) {
    return 1;
  }


  const query = `
    SELECT 
      e.id, 
      ed.title, 
      ed.description,
      e.created_by, 
      e.created_at,
      u.username,
      ed.event_dates, 
      ed.school_audience, 
      ed.audience, 
      ed.clubs, 
      ed.resources,
      ed.eventtype,
      ed.objectives
    FROM 
      events e
  `;
  const eventDetails = await db.query(query, [id]);

  return 0;
};

module.exports = Available;