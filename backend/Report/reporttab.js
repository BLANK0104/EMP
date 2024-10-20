const db = require('../db');

async function reporttab() {
  const query = 'SELECT * FROM report'; // Query to select all rows from the report table
  const result = await db.query(query); // Execute the query without parameters
  console.log("hiiiiiiiiiiiiii")
  console.log(result);
  return result.rows;
}

module.exports = reporttab;




// const db = require('../db');

// async function getReportAndUsernameByEventId(eventId) {
//   const query = `
//     SELECT r.*, u.username
//     FROM report r
//     JOIN events e ON r.event_id = e.id
//     JOIN users u ON e.created_by = u.id
//     WHERE r.event_id = $1
//   `;
//   const result = await db.query(query, [eventId]); // Execute the query with eventId as a parameter
//   console.log("hiiiiiiiii");
//   console.log(result);
//   return result.rows;
// }

// module.exports = getReportAndUsernameByEventId;
