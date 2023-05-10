require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
//cors
app.use(cors());
//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cookie-parser
app.use(cookieParser());
//json
app.use(express.json());
//set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
//set static folder
app.use(express.static(path.join(__dirname, '../public')));
//Auth Page
app.use('/', require('../routes/auth'));
//Home Page
app.use('/', require('../routes/home'));
//Profile Page
app.use('/user', require('../routes/profile'));
//Event Page
app.use('/event', require('../routes/event'));
//Search 
app.use('/search', require('../routes/search'));
//All api
app.use('/api', require('../routes/api'))
// Error 404
app.use('/404',(req, res) => {
    res.status(404).render('error404');
});

//test route - testing only
app.use('/', require('../routes/test'));


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));