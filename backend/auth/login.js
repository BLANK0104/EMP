require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Import your db module

const JWT_SECRET = process.env.JWT_SECRET;

const login = async ({ email, password }) => {
  try {
    const result = await db.query(
      "SELECT email, password, role, id FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return { error: "Invalid credentials" };
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Invalid credentials" };
    }

    // Generate the JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    role = user.role;

    // Return token and user data
    return { token, role };
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Server error" };
  }
};

module.exports = login;
