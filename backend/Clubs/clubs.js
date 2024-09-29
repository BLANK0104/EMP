const mysql = require('../db');

// List of table names
const tables = [
    --"INSTITUTIONS INNOVATION COUNCIL (IIC)",
    --"IPR CELL",
    --"E-CELL",
    --"INSTITUTE–INDUSTRY INTERACTION AND INTERNSHIP CELL (I4C)",
    --"NATIONAL INNOVATION AND START-UP POLICY (NISP) CELL",
    --"Saturday 10 am",
    "eoso",
    "The_Writers_Hub",
    --"RAW VISION CLUB",
    "ATRANGI_CLUB",
    "Computer_Society_of_India",
    "NMMUN",
    "Coding_Club",
    "App_Development_Club",
    "TEAM_UAS_NMIMS",
    "ISTE",
    "IEEE",
    "S4DS",
    --"AVINYA - IOT LAB",
    "Learn_Tech",
    --"FLAVIUM",
    --"AMBIORA - Technical Event",
    --"PROTSAHAN"
];

// Function to query each table
const queryTables = async () => {
    for (const table of tables) {
        const query = `SELECT * FROM \`${table}\``;
        connection.query(query, (err, results) => {
            if (err) {
                console.error(`Error executing query for table ${table}:`, err);
                return;
            }
            console.log(`Clubs from ${table}:`, results);
        });
    }

    // Close the connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing the connection:', err);
            return;
        }
        console.log('Connection closed.');
    });
};

// Execute the function
queryTables();