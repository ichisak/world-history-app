// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'saki0',
  host: 'localhost',
  database: 'world_history',
  password: 'postgres',   
  port: 5432,
});

module.exports = pool;
