const db = require("../db");

const calendar = async (req, res) => {
  try {
    const query = `
      SELECT 
        ed.*,
        u.coordinator,
        u.username
      FROM 
        event_details ed
      LEFT JOIN 
        events e ON ed.event_id = e.id
      LEFT JOIN 
        eventapprovals ea ON e.id = ea.event_id
      LEFT JOIN 
        users u ON e.created_by = u.id
      WHERE 
        ea.status = 'Approved';
    `;

    const result = await db.query(query);
    console.log("Result from query:", result.rows);

    const events = [];

    result.rows.forEach((event) => {
      event.event_dates.forEach((date) => {
        events.push({
          id: `event_${event.event_id}`,
          title: `${event.title}`, // Only event title, no venue
          start: `${date.date}T${date.start_time}`,
          end: `${date.date}T${date.end_time}`,
          eventtype: event.eventtype,
          coordinator: event.coordinator,
          username: event.username,
          venue: date.venues,
        });
      });
    });
    console.log("Events:", events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = calendar;
