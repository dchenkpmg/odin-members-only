#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("process");
require("dotenv").config();

const query = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  membership_status VARCHAR(50) NOT NULL,
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(query);
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
    console.log("Seeding complete.");
  }
}

main();
