const express = require('express');
const router = express.Router();
const { getProfile, getAllProfile, getDonationRecord, getAllHospitalProfile, getHospitalSummary, getFeedback } = require('../controllers/userAPI');
const { getEvent, getAllEventOfHospital, getRecentEvent, getAllJoinedDonor } = require('../controllers/eventAPI');
const { getAllIllness, getIllnessByUsername } = require('../controllers/othersAPI');
const { getProvince, getDistrict, getWard } = require('../controllers/addressAPI');
const { searchByBloodTypeAndAddress, searchHospitalByAddress } = require('../controllers/searchAPI');
//user
router.route('/user/:username').get(getProfile);
router.route('/user').get(getAllProfile);
//hospital
router.route('/hospital').get(getAllHospitalProfile);
router.route('/hospital/summary/:username').get(getHospitalSummary);
//event
router.route('/event/:eventID').get(getEvent);
router.route('/allEvent/:username').get(getAllEventOfHospital)
router.route('/recentEvent').get(getRecentEvent);
router.route('/all-joined-donor/:eventID').get(getAllJoinedDonor);
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
router.route('/search/donor').get(searchByBloodTypeAndAddress);
router.route('/search/hospital').get(searchHospitalByAddress);
//feedback
router.route('/get-feedback').get(getFeedback);


module.exports = router;