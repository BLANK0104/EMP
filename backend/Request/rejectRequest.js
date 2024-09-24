const db = require("../db");
const { sendNotification } = require("../Events/notification");

const rejectRequest = async (role, requestId, userId) => {
  // Get a client from the pool to execute queries in a transaction
  const client = await db.getClient();

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
    const eventTitle = `SELECT title FROM event_details where id = $1`;
    const titleResult = await client.query(eventTitle, [requestId]);
    const title = titleResult.rows[0];

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
      SET updated_at = CURRENT_TIMESTAMP, 
          status = $1,
          current_approver = $2
      WHERE id = $3;
    `;

    // Parameters for the `events` table update
    const eventParams = [
      "Rejected",
      null,
      requestId, // The ID of the event being updated
    ];

    // Execute the query for the `events` table
    await client.query(eventQuery, eventParams);

    const eventApprovalQueryUpdation = `UPDATE eventapprovals SET status = $1, updated_at= CURRENT_TIMESTAMP where event_id = $2 AND approver_id = $3`;
    const eventApprovalParamsUpdation = ["Rejected", requestId, userId];
    await client.query(eventApprovalQueryUpdation, eventApprovalParamsUpdation);

    const notificationDeletionQuery = `DELETE FROM notification WHERE user_id = $1 AND event_id = $2`;
    const notificationParamsDeletion = [userId, requestId];
    await client.query(notificationDeletionQuery, notificationParamsDeletion);
    // send notification to faculty
    //Email sent to Faculty/central Authority
    await sendNotification(
      createdUser,
      "Event Status notification",
      `Dear respected sir/ma'am,
        Your event titled "${title}" has been rejected by the ${role}.`
    );
    await client.query("COMMIT");
    console.log("Request rejected, and tables updated successfully.");
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query("ROLLBACK");
    console.error("Error updating tables:", error);
  } finally {
    // Release the client back to the pool
    client.release();
  }
};

module.exports = rejectRequest;
