const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb'
};

module.exports = dbConfig;
