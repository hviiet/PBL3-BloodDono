const db = require('../models');
const asyncHandler = require('express-async-handler');
const { getOneEvent, getFullAddress, getHospitalIDByUserName } = require('../utils/util');

const getEvent = asyncHandler(async (req, res) => {
    const _eventID = req.params.eventID;
    const _result = await getOneEvent(_eventID);
    if (!_result)
        res.status(404).json({ status: 'fail', message: 'Event not found' });
    //get number of people join event
    const JoinedDonor = db.Joined_Donor;
    const numberOfDonor = await JoinedDonor.count({
        where: {
            EventID: _eventID
        }
    });
    _result.data.numberOfDonor = numberOfDonor;
    res.status(200).json(_result);
});
const getAllEventOfHospital = asyncHandler(async (req, res) => {
    const hospitalID = await getHospitalIDByUserName(req.params.username);
    const EventInfo = db.Event_Information;
    const result = await EventInfo.findAll({
        attributes: ['EventID', 'EventName', 'EventStartTime', 'EventEndTime'],
        where: {
            HospitalID: hospitalID
        }
    });
    let data = [];
    result.forEach(element => {
        data.push({
            eventID: element.EventID,
            eventName: element.EventName,
            eventStartTime: element.EventStartTime,
            eventEndTime: element.EventEndTime
        });
    });
    res.status(200).json({ status: 'success', data });

});
const getRecentEvent = asyncHandler(async (req, res) => {
    const EventInfo = db.Event_Information;
    const result = await EventInfo.findAll({
        attributes: ['EventID', 'EventName', 'EventDonationPoint', 'EventStartTime'],
        order: [['EventStartTime', 'DESC']],
        limit: 2
    });
    let data = [];
    for (let i = 0; i < result.length; i++) {
        const address = await getFullAddress(result[i].EventDonationPoint);
        data.push({
            eventID: result[i].EventID,
            eventName: result[i].EventName,
            eventAddress: address.street + ', ' + address.ward + ', ' + address.district + ', ' + address.province,
            eventStartTime: result[i].EventStartTime
        });
    }
    res.status(200).json({ status: 'success', data });
});
module.exports = { getEvent, getAllEventOfHospital, getRecentEvent };