const db = require('../models');
const asyncHandler = require('express-async-handler');
const {getOneEvent} = require('../utils/util');

const getEvent = asyncHandler(async (req, res) => 
{
    const _eventID = req.params.eventID; 
    const _result = await getOneEvent(_eventID);
    if(!_result)
        res.status(404).json({status: 'fail', message: 'Event not found'});
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
const getAllEvent = asyncHandler(async (req,res) =>
{
    const EventInfo = db.Event_Information;
    const _result = await EventInfo.findAll({
        attributes: ['EventID']
    });
    let _data = [];
    for(let i = 0; i < _result.length; i++)
    {
        const _event = await getOneEvent(_result[i].EventID);
        if(_event.status == 'success')
        {
            _data.push(_event.data);
        }
    }
    res.status(200).json({status: 'success', _data});

});
module.exports = {getEvent, getAllEvent};