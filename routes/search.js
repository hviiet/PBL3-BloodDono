const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

router.route('/').get(cookieJwtAuth, (req, res) => {
    if (req.user) {
        res.render('search');
    }
    else {
        res.render('login');
    }
});


module.exports = router;
