const express = require('express');
const router = express.Router();
const db = require('../models');
const {testF,updatePassword} = require('../controllers/test');
const {register} = require('../controllers/auth');
const { route } = require('./auth');
const {getAllIllness} = require('../controllers/othersAPI');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {  cookieJwtAuth} = require('../middleware/cookieJwtAuth');
const { doctorCheck } = require('../middleware/doctorCheck');
const { donorCheck } = require('../middleware/donorCheck');
router.get('/test', updatePassword); 
router.get('/test2', (req,res)=>{
    res.render('donor-filter');
});
router.route('/test3').get(doctorCheck, (req, res) =>
{
    res.end('doctor-interface');
});
router.route('/test3').post((req, res) =>{
    
});
router.post('/test',upload.single('myImage'), testF);

module.exports = router;