const db = require('../models');
const asyncHandler = require('express-async-handler');
const { getNextID, createNewAddress, getDonorIDByUserName } = require('../utils/util');


const createNewEvent = asyncHandler(async (req, res) => {
    const { eventName, eventQuantity, eventStartTime, eventEndTime, eventAddress } = req.body;
    const hospitalID = req.user.hospitalID;
    const EventInfo = db.Event_Information;
    //create new address
    const newAddressID = await createNewAddress(eventAddress.street, eventAddress.ward, eventAddress.district, eventAddress.province);
    //create new event
    const newEventID = await getNextID('Event_Information', 'EventID');
    //event time tag
    const eventTimetag = new Date();
    await EventInfo.create({
        EventID: newEventID,
        EventName: eventName,
        HospitalID: hospitalID,
        EventTimetag: eventTimetag,
        EventStartTime: eventStartTime,
        EventEndTime: eventEndTime,
        EventDonationPoint: newAddressID,
        EventQuantity: eventQuantity

    });
    res.status(200).json({ message: 'Create new event successfully' });
});
const updateEvent = asyncHandler(async (req, res) => {
    const { eventName, eventQuantity, eventStartTime, eventEndTime, eventAddress } = req.body;
    const eventID = req.params.eventID;
    const EventInfo = db.Event_Information;
    let updateData = {};
    if (eventName) updateData.EventName = eventName;
    if (eventQuantity) updateData.EventQuantity = eventQuantity;
    if (eventStartTime) updateData.EventStartTime = eventStartTime;
    if (eventEndTime) updateData.EventEndTime = eventEndTime;
    if (eventAddress) {
        const addressID = await EventInfo.findOne({ where: { EventID: eventID } }).then(event => event.EventDonationPoint);
        await db.Address.update(eventAddress, { where: { AddressID: addressID } });
    }
    await EventInfo.update(updateData, { where: { EventID: eventID } });
    res.status(200).json({ message: 'Update event successfully' });
});
const registerEvent = asyncHandler(async (req, res) => {
    const eventID = req.params.eventID;
    const userID = await getDonorIDByUserName(req.user.username);
    //check if user already register this event
    const joinedDonor = await db.Joined_Donor.findOne({ where: { EventID: eventID, DonorID: userID } });
    if (joinedDonor) {
        res.status(400).json({ message: 'You already register this event' });
        return;
    }
    const hospitalID = await db.Event_Information.findOne({ where: { EventID: eventID } }).then(event => event.HospitalID);
    //insert into event registration
    const newJoinedDonor = await db.Joined_Donor.create({
        EventID: eventID,
        DonorID: userID,
        HospitalID: hospitalID
    });
    if (newJoinedDonor) res.status(200).json({ message: 'Register event successfully' });
    else res.status(500).json({ message: 'Register event failed' });
});
const deleteEvent = asyncHandler(async (req, res) => {
    const eventID = req.params.eventID;
    const event = await db.Event_Information.findOne({ where: { EventID: eventID } });
    if (!event) {
        res.status(400).json({ message: 'Event not found' });
        return;
    }
    //delete joined donor
    await db.Joined_Donor.destroy({ where: { EventID: eventID } });
    //delete donation record
    await db.Donation_Records.destroy({ where: { EventID: eventID } });
    //delete event
    await db.Event_Information.destroy({ where: { EventID: eventID } });
    res.status(200).json({ message: 'Delete event successfully' });
});
const updateDonationInfo = asyncHandler(async (req, res) => {
    const donorID = req.params.donorID;
    const { eventID, donationDate, donationVolume } = req.body;
    console.log(donorID);
    console.log(eventID);
    console.log(donationDate);
    console.log(donationVolume);
    await db.Joined_Donor.update({ IsDonated: true }, { where: { EventID: eventID, DonorID: donorID } });
    const isExits = await db.Donation_Records.findOne({ where: { DonorID: donorID, EventID: eventID } });
    if (isExits != null) {
        await db.Donation_Records.update({
            DonationDate: donationDate,
            DonationVolume: donationVolume
        },
            {
                where: { DonorID: donorID, EventID: eventID }
            }
        );
    }
    else {
        await db.Donation_Records.create({
            DonorID: donorID,
            EventID: eventID,
            DonationDate: donationDate,
            DonationVolume: donationVolume
        });
    }

    console.log('update donation info');
    res.status(200).json({ message: 'Update donation info successfully' });
});

module.exports = { createNewEvent, updateEvent, registerEvent, deleteEvent, updateDonationInfo };