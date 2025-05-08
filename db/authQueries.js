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

module.exports = {
  createUser,
};
