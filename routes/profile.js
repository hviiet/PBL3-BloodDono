const express = require('express');
const router = express.Router();
const path = require('path');
const { route } = require('./auth');
const db = require('../models');
const {getProfile} = require('../controllers/profile');

router.route('/:username').get(getProfile);

module.exports = router;