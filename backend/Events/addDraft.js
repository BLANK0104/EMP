const db = require("../db");
const { sendNotification } = require("./notification");

const addDraft = async ({
  title,
  description,
  created_by,
  eventDates,
  school,
  audience,
  clubs,
  resources,
  eventType,
  objectives,
  guests,
  otherClub,
  otherEvent,
}) => {
  const client = await db.getClient();
  try {
    await client.query("BEGIN");

    // Insert event into events table
    const eventQuery = `
      INSERT INTO events (created_by, status, current_approver, created_at, updated_at)
      VALUES ($1, 'Draft', $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id;
    `;
    const eventParams = [created_by, null];
    const result = await client.query(eventQuery, eventParams);
    const eventId = result.rows[0].id;

    // Insert event details into event_details table
    const eventDetailsQuery = `
      INSERT INTO event_details (event_id, title, description, event_dates, school_audience, audience, clubs, resources, created_at, updated_at, eventtype, objectives, guests, otherclub, otherevent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $9, $10, $11, $12, $13);
    `;

    // Update the eventDetailsParams to use the corrected arrays
    const eventDetailsParams = [
      eventId,
      title,
      description,
      eventDates,
      school,
      audience,
      clubs, // Use finalClubs here
      resources,
      eventType, // Use finalEventType here
      objectives,
      guests,
      otherClub,
      otherEvent,
    ];
    await client.query(eventDetailsQuery, eventDetailsParams);

    const createdUserEmail = `select email from users where id = $1`;
    const createdUserParams = [created_by];
    const responseUser = await client.query(
      createdUserEmail,
      createdUserParams
    );
    const createdUser = responseUser.rows[0].email;

    // Email sent to Faculty/central Authority
    await sendNotification(
      createdUser,
      "New Draft Created",
      `Dear respected sir/ma'am,
        Your event Draft titled "${title}" has been Created.`
    );

    await client.query("COMMIT");
    console.log("An event draft has been created and event details stored.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("An error occurred during adding new event draft: ", err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = addDraft;
