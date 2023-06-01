const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

router.get('/', cookieJwtAuth, (req, res) => {
    if (req.user) {
        let text = '';
        if (req.user.role == '1') {
            text = 'Thông tin cá nhân';
        }
        else if (req.user.role == '2') {
            text = 'Quản lí chiến dịch';
        }
        else if (req.user.role == '3') {
            text = 'Quản lí bệnh viện';
        }
        res.render('index-login', {
            username: req.user.username,
            link: `/user/${req.user.username}`,
            text: text
        });
    }
    else {
        res.render('index');
    }
});
module.exports = router;