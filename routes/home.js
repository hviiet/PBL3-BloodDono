const express = require('express');
const router = express.Router();
const path = require('path');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

router.get('/', cookieJwtAuth, (req, res) => {
    if(req.user)
    {
        res.sendFile(path.join(__dirname, '..','views','index.html'));
    }
    else
    {
        res.sendFile(path.join(__dirname, '..','views','index.html'));
    }
});
module.exports = router;