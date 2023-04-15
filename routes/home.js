const express = require('express');
const router = express.Router();
const path = require('path');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

router.get('/', cookieJwtAuth, (req, res) => {
    if(req.user)
    {
        console.log('You are logged in');
        res.sendFile(path.join(__dirname, '..','views','index.html'));
    }
    else
    {
        console.log('You are not logged in');
        res.sendFile(path.join(__dirname, '..','views','index.html'));
    }
});
module.exports = router;