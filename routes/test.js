const express = require('express');
const router = express.Router();
const {testF} = require('../controllers/test');
const {register} = require('../controllers/auth');
const { route } = require('./auth');

router.get('/test', testF);
router.post('/test', register);

module.exports = router;