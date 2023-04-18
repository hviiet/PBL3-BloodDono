const asyncHandler = require('express-async-handler');
const db = require('../models');
const {getUser} = require('../utils/address');


const getProfile = asyncHandler(async (req, res) => 
{
    const username = req.params.username;
    const data = await getUser(username);
    //return user info
    res.status(200).json({status:'success',username: username, data: data});
});
module.exports = {getProfile}