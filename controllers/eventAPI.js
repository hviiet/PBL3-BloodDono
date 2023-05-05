const db = require('../models');
const asyncHandler = require('express-async-handler');
const {getOneEvent} = require('../utils/util');

const getEvent = asyncHandler(async (req, res) => 
{
    const _eventID = req.params.eventID;
    const _result = await getOneEvent(_eventID);
    if(_result.status == 'fail')
    {
        return res.status(404).json({status: 'fail', message: _result.message});
    }
    // console.log(_result)
    res.status(200).json({status: 'success', data: _result});
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
    res.status(200).json({status: 'success', data: _data});

});
module.exports = {getEvent, getAllEvent};