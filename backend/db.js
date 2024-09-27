require("dotenv").config();
const { Pool } = require("pg");

// Create a pool of connections when the application starts
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Function to query the database
const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

// Function to get a client for transactions or multiple queries
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Function to close the pool when the application exits
const closePool = async () => {
  await pool.end();
  console.log("Database pool has been closed.");
};

module.exports = {
  query,
  getClient,
  closePool,
};
