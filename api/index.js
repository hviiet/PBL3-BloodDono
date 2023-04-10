require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const connectToDatabase = require('../config/dbConnect');
const connectDB = require('../config/dbConnect');

const connection = connectDB();

app.use(express.static(path.join(__dirname, '../public')));
//Home Page
app.use('/', require('../routes/home'));


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
