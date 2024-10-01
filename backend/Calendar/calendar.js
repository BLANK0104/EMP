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
    eventapprovals ea ON ed.event_id = ea.event_id
LEFT JOIN 
    events e ON ed.id = e.id
LEFT JOIN 
    users u ON e.created_by = u.id
WHERE
    ea.status = 'Approved'
        `;

    const result = await db.query(query);
    console.log("Result from query:", result);

    const events = [];

    result.rows.forEach((event) => {
      event.event_dates.forEach((date) => {
        const venues = Array.isArray(date.venues) ? date.venues : [date.venues];
        venues.forEach((venue) => {
          events.push({
            id: `event_${event.event_id}_${venue}`,
            title: `${event.title.substring(0, 50)} at ${venue.substring(0, 50)}`,
            start: `${date.date}T${date.start_time}`,
            end: `${date.date}T${date.end_time}`,
            eventtype: event.eventtype,
            venue: venue,
            coordinator: event.coordinator,
            username: event.username
          });
        });
      });
    });

   // console.log("Final events array:", events); // Add this log
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

module.exports = calendar;