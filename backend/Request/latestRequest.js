const db = require("../db");

const getRequestStatus = async (userId) => {
  try {
    const query = `SELECT 
                  ed.title, 
                  u.username AS current_approver_username, 
                  e.status 
              FROM 
                  events e
              JOIN 
                  users u 
                  ON e.current_approver = u.id
              JOIN
                  event_details ed
                  ON e.id = ed.event_id
              WHERE 
                  e.created_by = $1 
              ORDER BY 
                  e.created_at DESC 
              LIMIT 1;
`;

    const result = await db.query(query, [userId]);
    return result.rows; // returns an array of rows
  } catch (error) {
    console.error("Error fetching request status:", error);
    throw error; // rethrow the error for the calling function to handle
  }
};

module.exports = { getRequestStatus };
