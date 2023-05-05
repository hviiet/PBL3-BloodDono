const express = require('express');
const router = express.Router();
const {getProfile, getAllProfile,getDonationRecord} = require('../controllers/userAPI');
const { getEvent, getAllEvent } = require('../controllers/eventAPI');
const { getAllIllness} = require('../controllers/othersAPI');
const { getProvince,getDistrict,getWard } = require('../controllers/addressAPI');
const {searchByBloodTypeAndAddress} = require('../controllers/searchAPI');
const {cookieJwtAuth} = require('../middleware/cookieJwtAuth');

//user
router.route('/user/:username').get(getProfile);
router.route('/user').get(getAllProfile);
router.route('/user/:username/donation').get(cookieJwtAuth,getDonationRecord);
//event
router.route('/event/:eventID').get(getEvent);
router.route('/event').get(getAllEvent);
//illness
router.route('/illness/').get(getAllIllness);
//address
router.route('/address/province').get(getProvince);
router.route('/address/district/:provinceID').get(getDistrict);
router.route('/address/ward/:districtID').get(getWard);
//search
router.route('/search').get(searchByBloodTypeAndAddress);


module.exports = router;