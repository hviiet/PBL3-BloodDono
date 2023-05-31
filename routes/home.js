const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

router.get('/', cookieJwtAuth, (req, res) => {
    if (req.user) {
        res.render('index-login', {
            username: req.user.username,
            link: `/user/${req.user.username}`
        });
    }
    else {
        res.render('index');
    }
});
module.exports = router;