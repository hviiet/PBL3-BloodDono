const asyncHandler = require('express-async-handler');
const db = require('../models');
const {getOneUser} = require('../utils/util');


const getProfile = asyncHandler(async (req, res) => 
{
    const username = req.params.username;
    const data = await getOneUser(username);
    //return user info
    res.status(200).json({status:'success',username: username, data: data});
});
const getAllProfile = asyncHandler(async (req, res) =>
{
    const AccountInfo = db.Account_Information;
    const allAccount = await AccountInfo.findAll({
        attributes: ['Username']
    });
    let data = [];
    for(let i = 0; i < allAccount.length; i++)
    {
        const user = await getOneUser(allAccount[i].Username);
        data.push(user);
    }
    res.status(200).json({status:'success', data: data});
});
const getDonationRecord = asyncHandler(async (req, res) =>
{
    const DonationRecord = db.Donation_Records;
    const AccountInfo = db.Account_Information;
    const DonorInfo = db.Donor_Information;
    const _accountID = await AccountInfo.findOne({
        where: {Username: req.params.username},
        attributes: ['AccountID']
    });
    const _donorID = await DonorInfo.findOne({
        where: {AccountID: _accountID.AccountID},
        attributes: ['DonorID']
    });
    const _donation = await DonationRecord.findAll({where: {DonorID: _donorID.DonorID}});
    res.json(_donation);

});

module.exports = {getProfile, getAllProfile,getDonationRecord}