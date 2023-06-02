const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { updatePassword, updateProfile, uploadImageForProfile, deleteUser, approveHospital } = require('../controllers/profile');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');
const { donorCheck } = require('../middleware/donorCheck');

router.route('/:username').get(cookieJwtAuth, (req, res) => {

    if (req.user.role == '1') {
        res.render('donor-interface', {
            username: req.user.username
        });
    }
    else if (req.user.role == '2') {
        res.render('doctor-interface', {
            username: req.user.username
        });
    }
    else if (req.user.role == '3') {
        res.render('admin-interface');
    }
    else
        res.redirect('/login');
});
//donor route
router.route('/:username/update-password').post([cookieJwtAuth, donorCheck], updatePassword).get([cookieJwtAuth, donorCheck], (req, res) => {
    res.render('change-password-donor', {
        username: req.user.username
    });
});
router.route('/:username/update-profile').post([cookieJwtAuth, donorCheck], updateProfile).get([cookieJwtAuth, donorCheck], (req, res) => {
    res.render('change-info-donor', {
        username: req.user.username
    });
});
router.route('/:username/search-hospital').get((req, res) => {
    res.render('search-hospital', {
        username: req.params.username
    });
});
router.route('/:username/upload-image').post(upload.single('myImage'), uploadImageForProfile);
router.route('/:username/donate-history').post([cookieJwtAuth, donorCheck], updateProfile).get([cookieJwtAuth, donorCheck], (req, res) => {
    res.render('donate-history', {
        username: req.user.username
    });
});
//admin route
router.route('/:username/approve-hospital').post(cookieJwtAuth, approveHospital);
router.route('/:username/delete-user').post(cookieJwtAuth, deleteUser);


module.exports = router;