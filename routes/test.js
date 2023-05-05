const express = require('express');
const router = express.Router();
const {testF,updatePassword} = require('../controllers/test');
const {register} = require('../controllers/auth');
const { route } = require('./auth');
const {getAllIllness} = require('../controllers/othersAPI');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/test', (req,res)=>{
    res.render('test');
}); 
router.post('/test',upload.single('myImage'), testF);

module.exports = router;