const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/auth');

router.route('/login').post(login).get((req, res) => {
    res.render('login');
});
router.route('/register').post(register)

router.route('/register/donor').get((req, res) => {
    res.render('register-donor');
});
router.route('/register/hospital').get((req, res) => {
    res.render('register-hospital');
});
router.get('/logout', logout);

module.exports = router;
