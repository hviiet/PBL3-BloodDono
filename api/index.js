require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('../config/dbConnect');
const {connectDB} = require('../config/dbConnect');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
//authorization session
// app.use(session({
//     key: 'user_sid',
//     secret : process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         expires: 60*60*24*5
//     },
//     store: new session.MemoryStore()
// }));
//cors
app.use(cors());
//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cookie-parser
app.use(cookieParser());
//json
app.use(express.json());
//connect to database
const connection = connectDB();
//set static folder
app.use(express.static(path.join(__dirname, '../public')));
//Auth Page
app.use('/api', require('../routes/auth'));
//Home Page
app.use('/', require('../routes/home'));

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
