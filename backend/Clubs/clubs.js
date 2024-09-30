const mysql = require('../db');

const queryTables = async (id) => {
    try {
        // Fetch username
        const usernameQuery = `SELECT username FROM users WHERE id = ?`;
        mysql.query(usernameQuery, [id], (err, results) => {
            if (err) {
                console.error(`Error executing query for users table:`, err);
                return;
            }
            const username = results[0]?.username;
            console.log(`Username for user with id ${id}:`, username);

            // Fetch entire table with the same username
            const entireTableQuery = `SELECT * FROM users WHERE username = ?`;
            mysql.query(entireTableQuery, [username], (err, results) => {
                if (err) {
                    console.error(`Error executing query for entire users table:`, err);
                    return;
                }
                console.log(`Entire users table for username ${username}:`, results);

                // Continue querying other tables
                for (const table of tables) {
                    if (table !== 'users') {
                        const query = `SELECT * FROM \`${table}\``;
                        mysql.query(query, (err, results) => {
                            if (err) {
                                console.error(`Error executing query for table ${table}:`, err);
                                return;
                            }
                            console.log(`Data from ${table}:`, results);
                        });
                    }
                }
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Execute the function with a specific user id
queryTables(1);