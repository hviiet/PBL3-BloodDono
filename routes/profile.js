const express = require('express');
const router = express.Router();
const { updatePassword ,updateProfile} = require('../controllers/profile');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

router.route('/:username').get(cookieJwtAuth, (req, res) => {
    if(req.user.role == '1')
    {
        // res.sendFile(path.join(__dirname, '..','views','donor-interface.html'));
        res.render('donor-interface');
    }
    else if(req.user.role == '2')
    {
        // res.sendFile(path.join(__dirname, '..','views','doctor-interface.html'));
        res.render('doctor-interface');
    }
    else 
        res.redirect('/login');
});

router.route('/:username/update-password').post(updatePassword);
router.route('/:username/update-profile').post(cookieJwtAuth, updateProfile);


module.exports = router;