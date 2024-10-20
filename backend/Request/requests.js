const db = require("../db");

const requests = async (id) => {
  console.log("Entered Requests");
  const query = `
  SELECT 
    e.id, 
    ed.title, 
    ed.description,
    e.created_by, 
    e.created_at,
    u.coordinator,
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
  LEFT JOIN 
    event_details ed ON e.id = ed.event_id
  LEFT JOIN
    users u ON e.created_by = u.id
  WHERE 
    e.current_approver = $1
  ORDER BY 
    e.created_at ASC;
`;

  const result = await db.query(query, [id]);

  console.log(result.rows);
  return result.rows;
};

module.exports = requests;
