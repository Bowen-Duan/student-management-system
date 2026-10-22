const mysql = require('mysql2/promise');

// Database settings come from environment variables (see .env.example).
// Copy .env.example to .env and fill in your local values before running.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_system',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
