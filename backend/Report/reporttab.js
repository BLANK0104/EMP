const db = require('../db');

async function reporttab() {
  const query = 'SELECT * FROM report'; // Query to select all rows from the report table
  const result = await db.query(query); // Execute the query without parameters
  console.log(result);
  return result.rows;
}

module.exports = reporttab;