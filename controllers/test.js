const db = require('../models');
const asyncHandler = require('express-async-handler');
const json = require('express');
const { get } = require('../routes/auth');
const AccountInfo = db.account_information;
const {getUser} = require('../utils/address');

const getNextAccountID = asyncHandler(async (req,res) => {
    const lastAccountInfo = await AccountInfo.findOne({
      order: [['AccountID', 'DESC']]
    });
  
    let nextAccountID = "00000001";
    if (lastAccountInfo) {
      // Convert the last AccountID to a number and add 1
      const lastAccountIDNumber = parseInt(lastAccountInfo.AccountID, 10);
      nextAccountID = (lastAccountIDNumber + 1).toString().padStart(8, "0");
    }    
    // Return the next AccountID
    return { AccountID: nextAccountID };
  });

const testF = asyncHandler(async (req, res) => {
    const data = await getUser('hvietS');  
    res.status(200).json({status:'success', data: data});
});

module.exports = {testF};