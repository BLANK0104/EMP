const db = require("../db");

const calendar = async (req, res) => {
  try {
    const query = `
          SELECT 
            ed.*
          FROM 
            event_details ed
          LEFT JOIN 
            eventapprovals ea ON ed.event_id = ea.event_id
          WHERE
            ea.status = 'Approved'
        `;

    console.log("Executing query:", query); // Log the query being executed

    const result = await db.query(query);
    console.log("Query result:", result); // Log the raw result from the query

    const events = [];
    console.log("Result rows:", result.rows); // Log the rows returned from the query

    // Map the events into the format required by FullCalendar
    result.rows.forEach((event) => {
      event.event_dates.forEach((date) => {
        // Handle multiple venues if needed
        const venues = Array.isArray(date.venues) ? date.venues : [date.venues];
        venues.forEach((venue) => {
          events.push({
            id: `event_${event.event_id}_${venue}`, // Ensure a unique ID
            title: `${event.title.substring(0, 50)} at ${venue.substring(0, 50)}`, // Include venue in title if needed
            start: `${date.date}T${date.start_time}`, // Format start time
            end: `${date.date}T${date.end_time}`, // Format end time
          });
        });
      });
    });

    console.log("Mapped events:", events); // Log the mapped events

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = calendar;