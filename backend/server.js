const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticateToken, authorizedRole } = require("./auth/middleware");
const login = require("./auth/login");
const db = require("./db");
const addEvent = require("./Events/addEvent");
const { getRequestStatus } = require("./Request/latestRequest");
const requests = require("./Request/requests");
const reporttab = require("./Report/reporttab");
const acceptRequest = require("./Request/acceptRequest");
const rejectRequest = require("./Request/rejectRequest");
const modifyRequest = require("./Request/modifyRequest");
const Available = require("./Events/Available");
const calendar = require("./Calendar/calendar");
const Facultydashboard = require("./Dashboard/Facultydasboard");
const history = require("./History/history");
const historyDean = require("./History/historyDean");
const historyDirector = require("./History/historyDirector");
const addDraft = require("./Events/addDraft");
const { getDraft } = require("./Events/getDraft");
const DeanDirectorDashboard = require("./Dashboard/DeanDirectorDashboard");
const clubs = require("./Clubs/clubs");

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());

// Test the database connection by querying the database
(async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Connected to PostgreSQL at:", result.rows[0].now);
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
  }
})();

app.get(
  "/api/get-draft",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority"]),
  getDraft
);

app.post(
  "/api/event-draft",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority"]),
  async (req, res) => {
    const { id, role } = req.user;
    // console.log(id);
    // console.log("Role", role);
    const {
      eventTitle,
      description,
      audience,
      resources,
      clubs,
      otherClub,
      otherEvent,
      eventDates,
      school_audience,
      eventType,
      objectives,
      guests,
    } = req.body;
    console.log(otherClub);
    try {
      // Insert event details into the database, including parsed JSONB fields
      const eventId = await addDraft({
        title: eventTitle,
        description: description,
        created_by: id,
        audience: audience,
        resources: resources, // Convert JSON string back to array/object
        clubs: clubs, // Convert JSON string back to array/object
        eventDates: eventDates, // Parse JSONB for event dates and venues
        school: school_audience, // Parse school audience if it's stringified JSON
        eventType: eventType,
        objectives: objectives,
        guests: guests,
        otherClub: otherClub,
        otherEvent: otherEvent,
      });

      return res
        .status(201)
        .json({ message: "Event request submitted successfully", eventId });
    } catch (err) {
      console.error(`Error creating event draft request for user ${id}:`, err);
      return res.status(500).json({
        message: "An error occurred while creating the event draft request",
      });
    }
  }
);

app.post(
  "/api/event-request",
  authenticateToken,
  authorizedRole(["faculty", "centralauthority"]),
  async (req, res) => {
    const { id, role } = req.user;
    console.log(id);
    console.log("Role", role);
    const {
      eventTitle,
      description,
      audience,
      resources,
      clubs,
      eventDates,
      school_audience,
      eventType,
      objectives,
      guests,
      registration,
    } = req.body;

    const currentApproverQuery = await db.query(
      "select approver from request_assign where created_by = $1",
      [id]
    );
    let currentApprover = null;
    if (currentApproverQuery.rows.length > 0) {
      currentApprover = currentApproverQuery.rows[0].approver;
    }

    // console.log("CurrentApprover:", currentApprover);
    console.log(
      eventTitle,
      eventDates,
      description,
      audience,
      resources,
      clubs,
      eventDates,
      school_audience,
      currentApprover,
      eventType,
      objectives,
      guests,
      registration
    );
    try {
      // Insert event details into the database, including parsed JSONB fields
      const eventId = await addEvent({
        title: eventTitle,
        description: description,
        created_by: id,
        currentApprover: currentApprover,
        audience: audience,
        resources: resources, // Convert JSON string back to array/object
        clubs: clubs, // Convert JSON string back to array/object
        eventDates: eventDates, // Parse JSONB for event dates and venues
        school: school_audience, // Parse school audience if it's stringified JSON
        eventType: eventType,
        objectives: objectives,
        guests: guests,
        registration: registration,
      });

      return res.status(201);
      // .json({ message: "Event request submitted successfully", eventId });
    } catch (err) {
      console.error(`Error creating event request for user ${id}:`, err);
      return res.status(500).json({
        message: "An error occurred while creating the event request",
      });
    }
  }
);

// Verifying user with JWT token
app.get("/api/verify", authenticateToken, (req, res) => {
  res.status(200).json({ authenticate: true, user: req.user });
});

app.get("/api/request-status", authenticateToken, async (req, res) => {
  console.log("entered");
  try {
    const { id } = req.user;
    const statusData = await getRequestStatus(id);
    res.json(statusData);
  } catch (error) {
    console.error("Error fetching request status:", error);
    res.status(500).json({ error: "Failed to fetch request status" });
  }
});

app.get(
  "/api/requests",
  authenticateToken,
  authorizedRole(["dean", "director"]),
  async (req, res) => {
    console.log("hello");
    const { id } = req.user;
    try {
      const response = await requests(id);
      console.log(response);

      res.json(response);
    } catch {}
  }
);

app.get(
  "/api/reporttab",
  authenticateToken,
  authorizedRole(["dean", "director"]),
  async (req, res) => {
    console.log("Request received at /api/reporttab");
    const { id } = req.user;
    console.log(`User ID: ${id}`);
    try {
      const response = await reporttab(id);
      console.log("Report generated successfully");
      res.json(response);
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get(
  "/api/calendar",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority", "dean", "director"]),
  async (req, res) => {
    calendar(req, res);
  }
);

app.get("/api/role", authenticateToken, (req, res) => {
  // console.log("role api");
  // console.log(req.user);
  const { role } = req.user;
  // console.log(role);
  res.json({ role });
});

app.get(
  "/api/can-submit-request",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority"]),
  async (req, res) => {
    const { id } = req.user; // Ensure the id is correct and populated
    if (!id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    try {
      // Fetch the latest event created by the user
      const events = await db.query(
        `SELECT e.id, e.status
       FROM events e
       WHERE e.created_by = $1
       ORDER BY e.created_at DESC
       LIMIT 1;`,
        [id]
      );
      // console.log(events.rows.length);

      if (events.rows.length === 0) {
        return res.json({
          canSubmitRequest: true,
          canSubmitReport: false,
          eventId: null,
        });
      }

      const latestEventStatus = events.rows[0].status;
      console.log(`Latest event Status: ${latestEventStatus}`);
      const latestEventId = events.rows[0].id;
      console.log(`Latest Event id ${latestEventId}`);

      const report = await db.query(`select 1 from report where event_id =$1`, [
        latestEventId,
      ]);

      if (report.rowCount > 0) {
        return res.json({
          canSubmitRequest: true,
          canSubmitReport: false,
          eventId: null,
        });
      }

      if (latestEventStatus === "Pending") {
        return res.json({
          canSubmitRequest: false,
          canSubmitReport: false,
          eventId: events.rows[0].id,
        });
      } else if (latestEventStatus === "Approved") {
        return res.json({
          canSubmitRequest: false,
          canSubmitReport: true,
          eventId: null,
        });
      } else {
        return res.json({
          canSubmitRequest: true,
          canSubmitReport: false,
          eventId: null,
        });
      }
    } catch (error) {
      console.error("Error checking request permission:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.post(
  "/api/Available",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority"]),
  async (req, res) => {
    const { id, venue, eventDateTime } = req.body;

    try {
      const availability = await Available(id, venue, eventDateTime);
      if (availability === 1) {
        return res.status(200).json({
          Available: false,
          message: "Venue is already booked for the specified date and time.",
        });
      } else {
        return res
          .status(200)
          .json({ Available: true, message: "Venue is Available." });
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.post("/api/report-data", async (req, res) => {
  console.log("body:", req.body);
  const {
    event_id,
    title,
    event_type,
    guestSpeakers,
    startDate,
    startTime,
    endDate,
    endTime,
    objectives,
    venue,
    resources,
    audience,
    description,
    photos,
    facultyCoordinators,
    studentCoordinators,
    schools,
    branches,
    classes,
    years,
    clubs,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO report (
    event_id,
    title,
    event_type,
    guest_speakers,
    start_date,
    start_time,
    end_date,
    end_time,
    objectives,
    venue,
    resources,
    audience,
    description,
    photos,
    faculty_coordinators,
    student_coordinators,
    schools,
    branches,
    classes,
    years,
    clubs,
    created_at,
    updated_at
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ) RETURNING id`,
      [
        event_id,
        title,
        event_type,
        JSON.stringify(guestSpeakers), // Stored as JSON
        startDate,
        startTime,
        endDate,
        endTime,
        objectives, // Pass directly as array
        venue,
        resources,
        audience,
        description,
        photos.length > 0 ? JSON.stringify(photos) : "{}", // Ensure empty array or valid array literal
        facultyCoordinators.length > 0
          ? JSON.stringify(facultyCoordinators)
          : "{}", // Same here
        studentCoordinators.length > 0
          ? JSON.stringify(studentCoordinators)
          : "{}", // Same here
        schools.length > 0 ? schools : "{}", // Ensure it's an array literal if empty
        branches.length > 0 ? branches : "{}", // Same for branches
        classes.length > 0 ? classes : "{}", // Same for classes
        years.length > 0 ? years : "{}", // Same for years
        clubs,
      ]
    );

    // Respond with success and the created report ID
    res.status(201).json({
      message: "Report data successfully saved",
      reportId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error saving report data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/api/check-venue",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority"]),
  async (req, res) => {
    const { date, startTime, endTime, venues } = req.body;
    console.log(venues);
    Available(date, startTime, endTime, venues, req, res);
  }
);

app.get(
  "/api/dashboard",
  authenticateToken,
  authorizedRole(["dean", "faculty", "centralAuthority", "director"]),
  async (req, res) => {
    const { id, role } = req.user;
    // console.log(id);
    // console.log("Role", role);
    {
      role === "faculty" || role === "centralAuthority"
        ? Facultydashboard(id, req, res, role)
        : DeanDirectorDashboard(id, req, res, role);
    }
  }
);

// API endpoint to get all clubs
app.get("/api/clubs", (req, res) => {
  // When you have a real database, replace this with a database query
  res.json(Object.values(dummyClubsData));
});

// API endpoint to get a specific club
app.get("/api/clubs/:name", (req, res) => {
  const clubName = req.params.name;
  // When you have a real database, replace this with a database query
  const club = dummyClubsData[clubName];
  if (club) {
    res.json(club);
  } else {
    res.status(404).json({ error: "Club not found" });
  }
});

app.get(
  "/api/report",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority"]),
  async (req, res) => {
    const { id } = req.user; // Get user ID from the authenticated token
    console.log("report");

    try {
      const events = await db.query(
        `
      SELECT 
        e.id, 
        ed.title, 
        ed.description,
        ed.event_dates,
        ed.school_audience,
        ed.clubs,
        ed.otherclub,
        ed.eventtype,
        ed.otherevent,
        ed.guests,
        ed.resources,
        ed.objectives,
        ed.audience
      FROM events e
      JOIN event_details ed ON e.id = ed.event_id
      WHERE e.created_by = $1
      ORDER BY e.created_at DESC
      LIMIT 1;
    `,
        [id]
      );

      if (events.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "No events found for this user" });
      }

      const latestEvent = events.rows[0];
      console.log(latestEvent);

      res.status(200).json({ latestEvent });
    } catch (error) {
      console.error("Error fetching latest event report:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/api/current-club", authenticateToken, async (req, res) => {
  try {
    console.log("User ID from token:", req.user.id); // Log the user ID
    const { id } = req.user;
    const result = await db.query("SELECT username FROM users WHERE id = $1", [
      id,
    ]);
    console.log("Database query result:", result); // Log the database query result
    if (result.rows.length > 0) {
      res.json({ username: result.rows[0].username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get(
  "/api/history",
  authenticateToken,
  authorizedRole(["dean", "director", "faculty", "centralAuthority"]),
  async (req, res) => {
    const { id, role } = req.user; // Extract user ID from the token
    try {
      let historyData;
      if (role === "faculty" || role === "centralAuthority") {
        historyData = await history(id); // Pass the user ID
      } else if (role === "dean") {
        historyData = await historyDean(id); // Pass the user ID
      } else if (role === "director") {
        historyData = await historyDirector(id); // Pass the user ID
      }
      res.json(historyData);
    } catch (error) {
      res.status(500).send("Failed to fetch history data");
    }
  }
);

app.post("/api/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.user;
  try {
    // Fetch user data from the database
    const userResult = await db.query(
      "SELECT password FROM users WHERE id = $1",
      [id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const hashedPassword = userResult.rows[0].password;

    // Compare current password with stored password
    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    await db.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword,
      id,
    ]);

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

//accept request
app.post(
  "/api/accept",
  authenticateToken,
  authorizedRole(["dean", "director"]),
  async (req, res) => {
    try {
      const { requestId } = req.body;
      const { id, role } = req.user;

      console.log("User ID:", id);
      console.log("Role:", role);
      console.log("Request ID:", requestId);

      // Call acceptRequest function and handle the response if needed
      await acceptRequest(role, requestId, id);

      // Send success response back to the client
      res.status(200).json({ message: "Request accepted successfully" });
    } catch (error) {
      console.error("Error processing request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }
);

//Reject request
app.post(
  "/api/reject",
  authenticateToken,
  authorizedRole(["dean", "director"]),
  async (req, res) => {
    try {
      const { requestId } = req.body;
      const { id, role } = req.user;

      // console.log("User ID:", id);
      // console.log("Role:", role);
      // console.log("Request ID:", requestId);

      // Call acceptRequest function and handle the response if needed
      await rejectRequest(role, requestId, id);

      // Send success response back to the client
      res.status(200).json({ message: "Request rejected successfully" });
    } catch (error) {
      console.error("Error processing request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }
);

app.post(
  "/api/modify",
  authenticateToken,
  authorizedRole(["dean", "director"]),
  async (req, res) => {
    try {
      const { requestId, modification } = req.body;
      const { id, role } = req.user;

      // console.log("User ID:", id);
      // console.log("Role:", role);
      // console.log("Request ID:", requestId);

      // Call acceptRequest function and handle the response if needed
      await modifyRequest(role, requestId, id, modification);

      // Send success response back to the client
      res.status(200).json({ message: "Request modified successfully" });
    } catch (error) {
      console.error("Error processing request:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request" });
    }
  }
);

//settings
app.get(
  "/api/settings",
  authenticateToken,
  authorizedRole(["director", "dean", "faculty"]),
  async (req, res) => {
    console.log("settings");
    const { id } = req.user;
    try {
      // Query the database using the extracted email
      const result = await db.query(
        "SELECT username, email FROM users WHERE id = $1",
        [id]
      );
      // console.log(result);

      if (result.rows.length > 0) {
        res.status(200).json({
          username: result.rows[0],
          email: result.rows[0].email,
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get(
  "/api/clubs",
  authenticateToken,
  authorizedRole(["faculty", "centralAuthority", "dean", "director"]),
  async (req, res) => {
    const { id } = req.user;
    try {
      const response = await clubs(id);
      console.log(response);

      res.json(response);
    } catch {}
  }
);

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const { token, error, role } = await login({ email, password });

  if (error) {
    return res.status(401).json({ error });
  }

  // Set the token in the cookie, not sending it in the response body
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 3600000,
  });

  res.status(200).json({ message: "Logged in successfully", role });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Gracefully shut down the database pool when the application exits
process.on("SIGINT", async () => {
  await db.closePool();
  process.exit(0);
});
