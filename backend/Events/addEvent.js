const db = require("../db");
const { sendNotification } = require("./notification");

const addEvent = async ({
  title,
  description,
  created_by,
  currentApprover,
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
  console.log("created_by value:", created_by); // Debugging statement
  console.log("title:", title);
  console.log("description:", description);
  console.log("currentApprover:", currentApprover);
  console.log("eventDates:", eventDates);
  console.log("school:", school);
  console.log("audience:", audience);
  console.log("clubs:", clubs);
  console.log("resources:", resources);
  console.log(eventType, objectives);

  const client = await db.getClient();
  try {
    await client.query("BEGIN");

    // Insert event into events table
    const eventQuery = `
      INSERT INTO events (created_by, status, current_approver, created_at, updated_at)
      VALUES ($1, 'Pending', $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id;
    `;
    const eventParams = [created_by, currentApprover];
    const result = await client.query(eventQuery, eventParams);
    const eventId = result.rows[0].id;

    // Insert event approval details into EventApprovals table
    const eventApprovalQuery = `
      INSERT INTO eventapprovals (event_id, approver_id, status, created_at, updated_at)
      VALUES ($1, $2, 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;
    const eventApprovalParams = [eventId, currentApprover];
    await client.query(eventApprovalQuery, eventApprovalParams);

    // Insert event details into event_details table
    const eventDetailsQuery = `
      INSERT INTO event_details (event_id, title, description, event_dates, school_audience, audience, clubs, resources, created_at, updated_at, eventtype, objectives, guests)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $9, $10, $11);
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
    ];
    await client.query(eventDetailsQuery, eventDetailsParams);

    // Insert notification for the approver
    const notificationQuery = `
      INSERT INTO Notification (user_id, event_id, notification_type, message, sent_at)
      VALUES ($1, $2, 'Approval_Required', 'You have a new event titled "${title}" awaiting your approval.', CURRENT_TIMESTAMP);
    `;
    const notificationParams = [currentApprover, eventId];
    await client.query(notificationQuery, notificationParams);

    // Send notification email to the approver
    const userQuery = `
      SELECT email, username FROM Users WHERE id = $1;
    `;
    const userResult = await client.query(userQuery, [currentApprover]);
    const approverEmail = userResult.rows[0].email;
    const username = userResult.rows[0].username;

    await sendNotification(
      approverEmail,
      "New Event Approval Required",
      `You have a new event titled "${title}" awaiting your approval.`
    );
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
      "New Event Created",
      `Dear respected sir/ma'am,
        Your event titled "${title}" has been Created and has been sent successfully to ${username}.`
    );

    await client.query("COMMIT");
    console.log("An event has been created and event details stored.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("An error occurred during adding new event: ", err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = addEvent;
