const express = require('express');
const router = express.Router();
const {getProfile, getAllProfile,getDonationRecord} = require('../controllers/userAPI');
const { getEvent, getAllEvent } = require('../controllers/eventAPI');
const { getAllIllness,getIllnessByUsername} = require('../controllers/othersAPI');
const { getProvince,getDistrict,getWard } = require('../controllers/addressAPI');
const {searchByBloodTypeAndAddress} = require('../controllers/searchAPI');
//user
router.route('/user/:username').get(getProfile);
router.route('/user').get(getAllProfile);
//event
router.route('/event/:eventID').get(getEvent);
router.route('/event').get(getAllEvent);
//illness
router.route('/illness/').get(getAllIllness);
router.route('/illness/:username').get(getIllnessByUsername);
//donation record
router.route('/donation/:username').get(getDonationRecord);
//address
router.route('/address/province').get(getProvince);
router.route('/address/district/:provinceID').get(getDistrict);
router.route('/address/ward/:districtID').get(getWard);
//search
router.route('/search').get(searchByBloodTypeAndAddress);


module.exports = router;