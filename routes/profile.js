const express = require('express');
const router = express.Router();
const { updatePassword ,updateProfile} = require('../controllers/profile');
const {createNewEvent,updateEvent} = require('../controllers/event');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');
const { donorCheck } = require('../middleware/donorCheck');
const { doctorCheck } = require('../middleware/doctorCheck');

router.route('/:username').get(cookieJwtAuth, (req, res) => {

    if(req.user.role == '1')
    {
        // res.sendFile(path.join(__dirname, '..','views','donor-interface.html'));
        res.render('donor-interface',{
            username: req.user.username
        });
    }
    else if(req.user.role == '2')
    {
        // res.sendFile(path.join(__dirname, '..','views','doctor-interface.html'));
        res.render('doctor-interface',{
            username: req.user.username
        });
    }
    else 
        res.redirect('/login');
});
//donor route
router.route('/:username/update-password').post([cookieJwtAuth,donorCheck],updatePassword).get([cookieJwtAuth,donorCheck], (req, res) => 
{
    res.render('change-password-donor',{
        username: req.user.username
    });
});
router.route('/:username/update-profile').post([cookieJwtAuth,donorCheck], updateProfile).get([cookieJwtAuth,donorCheck], (req, res) => 
{
    res.render('change-info-donor',{
        username: req.user.username
    });
});
router.route('/:username/donate-history').post([cookieJwtAuth,donorCheck], updateProfile).get([cookieJwtAuth,donorCheck], (req, res) => 
{
    res.render('donate-history',{
        username: req.user.username
    });
});


module.exports = router;