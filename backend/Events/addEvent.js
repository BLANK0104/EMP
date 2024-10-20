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
  registration,
  directorRequest,
}) => {
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

    // Insert event approval details for current approver (Dean)
    const eventApprovalQuery = `
      INSERT INTO eventapprovals (event_id, approver_id, status, created_at, updated_at)
      VALUES ($1, $2, 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;
    const eventApprovalParams = [eventId, currentApprover];
    await client.query(eventApprovalQuery, eventApprovalParams);

    // Insert event approval details for Director, if applicable
    if (directorRequest !== null) {
      const directorApprovalParams = [eventId, directorRequest];
      await client.query(eventApprovalQuery, directorApprovalParams);
    }

    // Insert event details into event_details table
    const eventDetailsQuery = `
      INSERT INTO event_details (event_id, title, description, event_dates, school_audience, audience, clubs, resources, created_at, updated_at, eventtype, objectives, guests, registration)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $9, $10, $11, $12);
    `;
    const eventDetailsParams = [
      eventId,
      title,
      description,
      eventDates,
      school,
      audience,
      clubs,
      resources,
      eventType,
      objectives,
      guests,
      registration,
    ];
    await client.query(eventDetailsQuery, eventDetailsParams);

    // Fetch emails of approvers and the user who created the event
    const userQuery = `
      SELECT id, email, username FROM users WHERE id = ANY($1::int[]);
    `;
    const approverIds = [currentApprover];
    if (directorRequest) approverIds.push(directorRequest);
    approverIds.push(created_by); // Include the event creator's ID

    const userResult = await client.query(userQuery, [approverIds]);
    const userEmails = userResult.rows.reduce((acc, row) => {
      acc[row.id] = { email: row.email, username: row.username };
      return acc;
    }, {});

    const createdUser = userEmails[created_by];
    const deanApprover = userEmails[currentApprover];
    const directorApprover = directorRequest
      ? userEmails[directorRequest]
      : null;

    // Send notifications to Dean and Director (if applicable)
    await sendNotification(
      deanApprover.email,
      "New Event Approval Required",
      `You have a new event titled "${title}" awaiting your approval.`
    );

    if (directorApprover) {
      await sendNotification(
        directorApprover.email,
        "New Event Approval Required",
        `You have a new event titled "${title}" awaiting your approval.`
      );
    }

    // Notify the user who created the event
    await sendNotification(
      createdUser.email,
      "New Event Created",
      `Your event titled "${title}" has been created and sent to ${
        deanApprover.username
      }${
        directorApprover ? ` and ${directorApprover.username}` : ""
      } for approval.`
    );

    // Insert notifications into Notification table for both Dean and Director
    const notificationQuery = `
      INSERT INTO Notification (user_id, event_id, notification_type, message, sent_at)
      VALUES ($1, $2, 'Approval_Required', 'You have a new event titled "${title}" awaiting your approval.', CURRENT_TIMESTAMP)
    `;
    const notifications = [
      [currentApprover, eventId],
      ...(directorRequest ? [[directorRequest, eventId]] : []),
    ];

    for (const notification of notifications) {
      await client.query(notificationQuery, notification);
    }

    await client.query("COMMIT");
    console.log("Event created and notifications sent.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error during event creation: ", err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = addEvent;
