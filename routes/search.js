const express = require('express');
const router = express.Router();
// const {searchByBloodTypeAndAddress} = require('../controllers/search');

router.route('/').get((req, res) => {
    res.render('search');
});


module.exports = router;
