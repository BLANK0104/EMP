const db = require("../db");
const upcomingEvents = require("./upcomingEvents");

const Facultydashboard = async (id, req, res, role) => {
  try {
    // Fetch username
    const usernameResult = await db.query(
      "SELECT username FROM users WHERE id = $1",
      [id]
    );
    const username = usernameResult.rows[0]?.username;

    // Fetch event statuses and dates
    const eventStatusQuery = `
      SELECT 
        e.status,
        e.id AS event_id,
        ed.event_dates->0->>'date' AS event_date  
      FROM 
        events e
      JOIN 
        event_details ed 
      ON 
        e.id = ed.event_id
      WHERE 
        e.created_by = $1;
    `;
    const response = await db.query(eventStatusQuery, [id]);
    const data = response.rows;
    // console.log(data);

    // Fetch upcoming events
    const upcomingevent = await upcomingEvents();
    // console.log("dashboard.js", upcomingevent);

    // Fetch latest event
    const latestEventQuery = `
  SELECT e.id, e.status, us.username, ed.event_dates, ea.reason AS modification_reason
  FROM events AS e
  LEFT JOIN users AS us ON e.current_approver = us.id
  LEFT JOIN event_details AS ed ON e.id = ed.event_id
  LEFT JOIN eventapprovals AS ea ON e.id = ea.event_id AND e.status = 'Modified'
  WHERE e.created_by = $1
  ORDER BY e.created_at DESC
  LIMIT 1;
`;
    const latest = await db.query(latestEventQuery, [id]);
    const latestData = latest.rows[0];
    console.log("latestData: ", latestData);

    let reportStatus = true;
    let nextevent = false; // Track if the event is upcoming

    // Handle case when no latest event is found
    if (!latestData) {
      reportStatus = null;
    } else {
      // Parse event dates and check if event date is upcoming or passed
      const currentDateTime = new Date();
      const eventDates = latestData.event_dates;

      if (eventDates) {
        nextevent = eventDates.some((event) => {
          const eventDate = new Date(event.date);
          return eventDate > currentDateTime; // Check if there's any future event date
        });
      }

      if (latestData.username === null) {
        // Check if a report exists for the latest event
        const reportQuery = `
      SELECT COUNT(*) AS report_exists
      FROM report
      WHERE event_id = $1;
    `;
        const reportResult = await db.query(reportQuery, [latestData.id]);
        const reportExists = reportResult.rows[0].report_exists > 0;

        // If no report exists
        reportStatus = reportExists ? null : false;
      }
    }

    // Construct response object
    const responseObj = {
      data,
      username,
      upcomingevent, 
      nextevent,
      latestData,
      reportStatus,
      role,
    };

    // Return the fetched event data
    res.json(responseObj);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = Facultydashboard;
