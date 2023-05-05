const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const db = require('../models');

const updateProfile = asyncHandler(async (req, res) =>
{
    const DonoInfo = db.Donor_Information;
    const {name, gender, birth, heigh, weight, bloodType, address, phoneNumber, photo, email} = req.body;
    let _updateData = {};
    if(name) _updateData.DonorName = name;
    if(gender) _updateData.Gender = gender;
    if(birth) _updateData.DonorBirth = birth;
    if(heigh) _updateData.DonorHeight = heigh;
    if(weight) _updateData.DonorWeight = weight;
    if(bloodType) _updateData.DonorBloodType = bloodType;
    if(address)
    {
        const _donorID = req.user.donorID;        
        const _addressID = await DonoInfo.findOne({where: {DonorID: _donorID}}).then(_donorAddress => _donorAddress.DonorAddress);
        await db.Address.update(address, {where: {AddressID: _addressID}});
    }
    if(phoneNumber) _updateData.DonorPhoneNumber = phoneNumber;
    if(photo) _updateData.DonorPhoto = photo;
    if(email) _updateData.DonorEmail = email;
    await DonoInfo.update(_updateData, {where: {DonorID: req.user.donorID}});
    res.status(200).json({message: 'Profile updated'});
});

const updatePassword = asyncHandler(async (req, res) => 
{
    const {oldPassword, newPassword, username} = req.body;
    const AccountInfo = db.Account_Information;
    const _user = await AccountInfo.findOne({where: {Username: username}});
    if(!oldPassword)
    {
        return res.status(400).json({message: 'User not found'});
    }
    const _validPassword = await bcrypt.compare(oldPassword, _user.Password);
    if(!_validPassword)
    {
        return res.status(400).json({message: 'Invalid password'});
    }
    const _salt = bcrypt.genSaltSync(10);
    const _hashedPassword = bcrypt.hashSync(newPassword, _salt);
    await AccountInfo.update({Password: _hashedPassword}, {where: {Username: username}});
    res.status(200).json({message: 'Password updated'});
});

module.exports = {updatePassword,updateProfile}