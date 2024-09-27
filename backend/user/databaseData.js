require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const { Pool } = require("pg");

const USER = process.env.PGUSER;
const HOST = process.env.PGHOST;
const DBPASSWORD = process.env.PGPASSWORD;
const DBNAME = process.env.PGDATABASE;
const DBPORT = process.env.PGPORT;

console.log(DBPASSWORD);

const pool = new Pool({
  user: USER,
  host: HOST,
  database: DBNAME,
  password: DBPASSWORD,
  port: DBPORT,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    return;
  }
  console.log("Connected to PostgreSQL");
});

// Read and parse the JSON file
fs.readFile("./user.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  const users = JSON.parse(data);

  // Insert each user into the PostgreSQL database
  users.forEach(async (user) => {
    try {
      const query = `
        INSERT INTO users (username, email, password, role)
        VALUES ($1, $2, $3, $4)
      `;
      await pool.query(query, [
        user.username,
        user.email,
        user.password,
        user.role,
      ]);
      console.log(`Inserted user: ${user.username}`);
    } catch (error) {
      console.error("Error inserting user:", error);
      pool.end()
    }
  });
});
