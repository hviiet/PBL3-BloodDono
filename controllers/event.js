const db = require('../models');
const asyncHandler = require('express-async-handler');
const {getNextID,createNewAddress} = require('../utils/util');


const createNewEvent = asyncHandler(async (req, res) => 
{
    const {eventName,eventQuantity, eventStartTime,eventEndTime,eventAddress} = req.body;
    const _hospitalID = req.user.hospitalID;
    const EventInfo = db.Event_Information;
    //create new address
    const _newAddressID = await createNewAddress(eventAddress.street, eventAddress.ward, eventAddress.district, eventAddress.province);
    //create new event
    const _newEventID = await getNextID('Event_Information', 'EventID');
    //event time tag
    const eventTimetag = new Date();
    await EventInfo.create({
        EventID: _newEventID,
        EventName: eventName,
        HospitalID: _hospitalID,
        EventQuantity: eventQuantity,   
        EventTimetag: eventTimetag,
        EventStartTime: eventStartTime,
        EventEndTime: eventEndTime,
        EventDonationPoint: _newAddressID
    });
    res.status(200).json({message : 'Create new event successfully'});
});
const updateEvent = asyncHandler(async (req, res) =>
{
    const {eventName, eventQuantity, eventStartTime, eventEndTime, eventAddress} = req.body;
    const eventID = req.params.eventID;
    const EventInfo = db.Event_Information;
    let _updateData = {};
    if(eventName) _updateData.EventName = eventName;
    if(eventQuantity) _updateData.EventQuantity = eventQuantity;
    if(eventStartTime) _updateData.EventStartTime = eventStartTime;
    if(eventEndTime) _updateData.EventEndTime = eventEndTime;
    if(eventAddress)
    {
        const _addressID = await EventInfo.findOne({where: {EventID: eventID}}).then(_event => _event.EventDonationPoint);
        await db.Address.update(eventAddress, {where: {AddressID: _addressID}});
    }
    await EventInfo.update(_updateData, {where: {EventID: eventID}});
    res.status(200).json({message: 'Update event successfully'});
});
module.exports = {createNewEvent,updateEvent};