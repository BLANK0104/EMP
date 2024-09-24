// Node.js example to hash a password
const bcrypt = require("bcryptjs");

const plainPassword = "admin@123";
const saltRounds = 10; // Number of salt rounds for hashing

bcrypt.compare(
  plainPassword,
  "$2a$10$Mb6bhFCOBYNxPzQ.Bi7YKOwBvhEOInqPPKq8rWSzcMHBlot73HJWu",
  (err, result) => {
    if (err) {
      console.error("Error wrong:", err);
    } else {
      console.log("Hashed password:", result);
      // Use this hash value in your SQL INSERT statement
    }
  }
);
