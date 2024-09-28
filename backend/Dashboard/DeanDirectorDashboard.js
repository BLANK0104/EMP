const db = require("../db");
const upcomingEvents = require("./upcomingEvents");

const DeanDirectorDashboard = async (id, req, res, role) => {
  const usernameResult = await db.query(
    "SELECT username FROM users WHERE id = $1",
    [id]
  );
  const username = usernameResult.rows[0]?.username;

  const dataQuery = `
  SELECT 
    status,
    event_id,
    TO_CHAR(created_at, 'YYYY-MM-DD') AS event_date
  FROM 
    eventapprovals 
  WHERE 
    approver_id = $1;
`;
  const response = await db.query(dataQuery, [id]);
  //   console.log(response);
  const data = response.rows;
  // console.log(data);

  const upcomingevent = await upcomingEvents();
  const currentStatusQuery = `SELECT COUNT(*) AS status_pending FROM eventapprovals WHERE approver_id = $1 AND status = 'Pending'`;
  const currentStatus = await db.query(currentStatusQuery, [id]);
  const currentStatusValue = currentStatus.rows[0]?.status_pending;
  const responseObj = {
    username,
    data,
    upcomingevent,
    currentStatusValue,
  };
  res.json(responseObj);
};

module.exports = DeanDirectorDashboard;
