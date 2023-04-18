// require('dotenv').config();
// const mysql = require('mysql');

// const BDdata = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1111',
//   database: 'testdb'
// });
// function connectDB() {
//   BDdata.connect(function(err) {
//     if (err) {
//       console.error('Error connecting to database: ' + err.stack);
//       return;
//     }
//     console.log('Connected to database with threadId: ' + BDdata.threadId);
//   });
//   return BDdata;
// }

// module.exports = { connectDB, BDdata};