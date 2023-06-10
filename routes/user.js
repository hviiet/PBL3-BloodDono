const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { updatePassword, updateProfile, uploadImageForProfile, deleteUser, approveHospital, sendFeedback } = require('../controllers/user');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');
const { donorCheck } = require('../middleware/donorCheck');
const { adminCheck } = require('../middleware/adminCheck');

router.route('/:username').get(cookieJwtAuth, (req, res) => {
    if (req.user) {
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
    }
    else
        res.redirect('/404');
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
router.route('/:username/search-hospital').get([cookieJwtAuth, donorCheck], (req, res) => {
    res.render('search-hospital', {
        username: req.params.username
    });
});
router.route('/:username/upload-image').post([cookieJwtAuth, donorCheck], upload.single('myImage'), uploadImageForProfile);
router.route('/:username/donate-history').post([cookieJwtAuth, donorCheck], updateProfile).get([cookieJwtAuth, donorCheck], (req, res) => {
    res.render('donate-history', {
        username: req.user.username
    });
});
//admin route
router.route('/:username/approve-hospital').post([cookieJwtAuth, adminCheck], approveHospital);
router.route('/:username/delete-user').post([cookieJwtAuth, adminCheck], deleteUser);
//feedback route
router.route('/:username/send-feedback').post(cookieJwtAuth, sendFeedback);

module.exports = router;