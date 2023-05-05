const express = require('express');
const router = express.Router();
const {createNewEvent,updateEvent} = require('../controllers/event');

router.route('/:eventID').get((req, res) => 
{
    res.render('event');
});
router.route('/create-event').post(createNewEvent).get((req, res) =>
{
    res.render('create-event');
});
router.route('/update-event').post(updateEvent).get((req, res) =>
{
    res.render('update-event');
});
module.exports = router;