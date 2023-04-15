const express = require('express');
const router = express.Router();
const path = require('path');
const { login, register, logout } = require('../controllers/auth');

router.route('/login').post(login).get((req, res) => {
    res.sendFile(path.join(__dirname, '..','views','login.html'));
});
router.route('/register').post(register).get((req, res) => {
    res.sendFile(path.join(__dirname, '..','views','register.html'));
});
router.post('/logout', logout);

module.exports = router;
