const express = require('express');
const router = express.Router();
const { doctorCheck } = require('../middleware/doctorCheck');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');
const {createNewEvent,updateEvent} = require('../controllers/event');

router.route('/view/:eventID').get((req, res) => 
{
    const eventID = req.params.eventID;
    res.render('event',{
        eventID : eventID
    }); 
});
router.route('/create-event').post([cookieJwtAuth,doctorCheck],createNewEvent).get([cookieJwtAuth,doctorCheck], (req, res) =>
{
    res.render('event-create',{
        username: req.user.username
    });
});
router.route('/update-event/:eventID').post([cookieJwtAuth,doctorCheck],updateEvent).get([cookieJwtAuth,doctorCheck], (req, res) =>
{
    res.render('event-edit',{
        username: req.user.username
    });
});

module.exports = router;