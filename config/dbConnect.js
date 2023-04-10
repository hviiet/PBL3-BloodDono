require('dotenv').config();
const mysql = require('mysql');

function connectDB() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'testdb'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database with threadId: ' + connection.threadId);
  });

  return connection;
}

module.exports = connectDB;