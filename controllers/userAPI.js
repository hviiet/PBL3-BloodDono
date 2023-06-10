const asyncHandler = require('express-async-handler');
const db = require('../models');
const { getOneUser, getHospitalIDByUserName } = require('../utils/util');


const getProfile = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const data = await getOneUser(username);
    //return user info
    res.status(200).json({ status: 'success', username: username, data: data });
});
const getAllProfile = asyncHandler(async (req, res) => {
    const AccountInfo = db.Account_Information;
    const allAccount = await AccountInfo.findAll({
        attributes: ['Username']
    });
    let data = [];
    for (let i = 0; i < allAccount.length; i++) {
        const user = await getOneUser(allAccount[i].Username);
        data.push(user);
    }
    res.status(200).json({ status: 'success', data: data });
});
const getAllHospitalProfile = asyncHandler(async (req, res) => {
    const AccountInfo = db.Account_Information;
    const allAccount = await AccountInfo.findAll({
        attributes: ['Username'],
        where: { Role: 2 }
    });
    let data = [];
    for (let i = 0; i < allAccount.length; i++) {
        const user = await getOneUser(allAccount[i].Username);
        user.username = allAccount[i].Username;
        data.push(user);
    }
    res.status(200).json({ status: 'success', data: data });
});
const getDonationRecord = asyncHandler(async (req, res) => {
    const DonationRecord = db.Donation_Records;
    const AccountInfo = db.Account_Information;
    const DonorInfo = db.Donor_Information;
    const _accountID = await AccountInfo.findOne({
        where: { Username: req.params.username },
        attributes: ['AccountID']
    });
    const _donorID = await DonorInfo.findOne({
        where: { AccountID: _accountID.AccountID },
        attributes: ['DonorID']
    });
    const _donation = await DonationRecord.findAll({ where: { DonorID: _donorID.DonorID } });
    res.json(_donation);

});
const getHospitalSummary = asyncHandler(async (req, res) => {
    const username = req.params.username;
    const hospitalID = await getHospitalIDByUserName(username);
    const eventSum = await db.Event_Information.count({ where: { HospitalID: hospitalID } });
    const donorSum = await db.Joined_Donor.count({ where: { HospitalID: hospitalID } });
    const donatedSum = await db.Joined_Donor.count({ where: { HospitalID: hospitalID, IsDonated: true } });
    const data = {
        eventSum: eventSum,
        donorSum: donorSum,
        donatedSum: donatedSum
    }
    const query = `SELECT Event_Information.EventID, EventName, EventStartTime, 
	               IF (
                   EXISTS (SELECT EventID
                   FROM Joined_Donor
                   WHERE EventID = Event_Information.EventID), COUNT(*), 0) AS Joined_Number
                   FROM Event_Information LEFT JOIN Joined_Donor ON (Event_Information.EventID = Joined_Donor.EventID)
                   WHERE Event_Information.HospitalID = '${hospitalID}'
                   GROUP BY EventID, EventName, EventStartTime
                   ORDER BY EventStartTime DESC
                   LIMIT 30;`;
    const eventList = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    let graphData =
    {
        labels: [],
        eventID: [],
        data: [],
    };
    for (let i = eventList.length - 1; i >= 0; i--) {
        graphData.labels.push(eventList[i].EventName);
        graphData.eventID.push(eventList[i].EventID);
        graphData.data.push(eventList[i].Joined_Number);
    }
    res.status(200).json({ status: 'success', data: data, graphData: graphData });
});
const getFeedback = asyncHandler(async (req, res) => {
    const feedback = await db.Feedback.findAll({
        limit: 10,
        order: [['FeedbackID', 'DESC']],
        attributes: ['Username', 'FeedbackText']
    });
    let data = [];
    for (let i = 0; i < feedback.length; i++) {
        const user = await getOneUser(feedback[i].Username);
        data.push({
            name: user.name,
            photo: user.photo ?? '/assets/img/help.png',
            feedbackText: feedback[i].FeedbackText
        });
    }
    res.status(200).json({ status: 'success', data: data });
});
const getAvatar = asyncHandler(async (req, res) => {
    const user = await getOneUser(req.params.username);
    const data = {
        name: user.name,
        photo: user.photo ?? '/assets/img/help.png'
    }
    res.status(200).json({ status: 'success', data: data });
});

module.exports = {
    getProfile,
    getAllProfile,
    getDonationRecord,
    getAllHospitalProfile,
    getHospitalSummary,
    getFeedback,
    getAvatar
}