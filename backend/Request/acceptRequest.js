const db = require("../db");
const { sendNotification } = require("../Events/notification");

const acceptRequest = async (role, requestId, userId) => {
  // Get a client from the pool to execute queries in a transaction
  const client = await db.getClient();

  // status for next approver_id
  const user = {
    dean: 15,
  };

  try {
    // Begin transaction
    await client.query("BEGIN");

    const eventCreatedQuery = `select created_by from events where id = $1`;
    const eventCreatedParams = [requestId];
    const responseEvent = await client.query(
      eventCreatedQuery,
      eventCreatedParams
    );
    const eventCreated = responseEvent.rows[0].created_by;

    const createdUserEmail = `select email from users where id = $1`;
    const createdUserParams = [eventCreated];
    const responseUser = await client.query(
      createdUserEmail,
      createdUserParams
    );
    const createdUser = responseUser.rows[0].email;

    // Query for updating the `events` table
    const eventQuery = `
      UPDATE events 
      SET current_approver = $1, 
          updated_at = CURRENT_TIMESTAMP, 
          status = $2
      WHERE id = $3;
    `;

    // Parameters for the `events` table update
    const eventParams = [
      role === "dean" ? user.dean : null, // Sets the current approver based on the role
      role === "director" ? "Approved" : "Pending", // Sets status based on the role
      requestId, // The ID of the event being updated
    ];

    // Execute the query for the `events` table
    await client.query(eventQuery, eventParams);

    const eventApprovalQueryUpdation = `UPDATE eventapprovals SET status = $1, updated_at= CURRENT_TIMESTAMP where event_id = $2 AND approver_id = $3`;
    const eventApprovalParamsUpdation = ["Approved", requestId, userId];
    await client.query(eventApprovalQueryUpdation, eventApprovalParamsUpdation);

    const notificationDeletionQuery = `DELETE FROM notification WHERE user_id = $1 AND event_id = $2`;
    const notificationParamsDeletion = [userId, requestId];
    await client.query(notificationDeletionQuery, notificationParamsDeletion);
    const eventTitle = `SELECT title FROM event_details where id = $1`;
    const titleResult = await client.query(eventTitle, [requestId]);
    const title = titleResult.rows[0];

    if (role === "dean") {
      //Inserting the data for director
      const eventApprovalDirector = `
      INSERT INTO eventapprovals (event_id, approver_id, status, created_at, updated_at)
      VALUES ($1, $2, 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `;
      const eventApprovalParamsDirector = [requestId, user.dean];
      await client.query(eventApprovalDirector, eventApprovalParamsDirector);
      // Insert notification for the approver
      const notificationQuery = `
      INSERT INTO Notification (user_id, event_id, notification_type, message, sent_at)
      VALUES ($1, $2, 'Approval_Required', 'You have a new event titled "${title}" awaiting your approval.', CURRENT_TIMESTAMP);
    `;
      const notificationParams = [user.dean, requestId];
      await client.query(notificationQuery, notificationParams);
      // Send notification email to the approver
      const userQuery = `
      SELECT email FROM Users WHERE id = $1;
    `;
      const userResult = await client.query(userQuery, [user.dean]);
      const approverEmail = userResult.rows[0].email;
      //Email sent to Director
      await sendNotification(
        approverEmail,
        "New Event Approval Required",
        `You have a new event titled "${title}" awaiting your approval.`
      );

      // Commit the transaction if all queries succeed
    }
    //Email sent to Faculty/central Authority
    await sendNotification(
      createdUser,
      "Event Status notification",
      `Dear respected sir/ma'am,
        Your event titled "${title}" has been approved by the ${role}.`
    );

    await client.query("COMMIT");
    console.log("Request accepted, and tables updated successfully.");
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query("ROLLBACK");
    console.error("Error updating tables:", error);
  } finally {
    // Release the client back to the pool
    client.release();
  }
};

module.exports = acceptRequest;
