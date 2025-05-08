const pool = require("../db/pool");

async function createUser(
  username,
  password,
  firstName,
  lastName,
  membershipStatus,
) {
  await pool.query(
    "INSERT INTO users (username, password, first_name, last_name, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [username, password, firstName, lastName, membershipStatus],
  );
}

async function upgradeUser(userId, membershipStatus) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
    membershipStatus,
    userId,
  ]);
}

async function getMessages() {
  const { rows } = await pool.query(
    `SELECT 
          messages.id AS msg_id, 
          title, 
          message, 
          timestamp, 
          username, 
          membership_status 
       FROM 
          messages 
       JOIN 
          users 
       ON 
          messages.user_id = users.id 
       ORDER BY 
          timestamp`,
  );
  return rows;
}

async function createMessage(userId, title, message) {
  await pool.query(
    "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
    [userId, title, message],
  );
}

module.exports = {
  createUser,
  upgradeUser,
  getMessages,
  createMessage,
};
