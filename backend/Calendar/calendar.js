const db = require("../db");

const calendar = async (req, res) => {
  try {
    const query = `
          SELECT 
            e.id AS event_id,
            ed.title,
            ed.event_dates
          FROM 
            events e
          LEFT JOIN 
            event_details ed ON e.id = ed.event_id
          WHERE
            e.status = 'Approved'
        `;

    const result = await db.query(query);
    const events = [];
    // console.log(result.rows);

    // Map the events into the format required by FullCalendar
    result.rows.forEach((event) => {
      event.event_dates.forEach((date) => {
        // Handle multiple venues if needed
        const venues = Array.isArray(date.venues) ? date.venues : [date.venues];
        venues.forEach((venue) => {
          events.push({
            id: `event_${event.event_id}_${venue}`, // Ensure a unique ID
            title: `${event.title.substring(0, 5)}@${venue.substring(0, 5)}`, // Include venue in title if needed
            start: `${date.date}T${date.start_time}`, // Format start time
            end: `${date.date}T${date.end_time}`, // Format end time
          });
        });
      });
    });
    // console.log(events);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
};
module.exports = calendar;
