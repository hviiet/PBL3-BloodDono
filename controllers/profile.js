const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const db = require('../models');

const updateProfile = asyncHandler(async (req, res) =>
{
    const DonoInfo = db.Donor_Information;
    const _donorID = req.user.donorID;
    const {name, gender, birth, height, weight, bloodType, address, phoneNumber, photo, email, selectedIllnessList} = req.body;
    let _updateData = {};
    _updateData.DonorName = name;
    _updateData.Gender = gender;
    _updateData.DonorBirth = birth;
    _updateData.DonorHeight = height;
    _updateData.DonorWeight = weight;
    _updateData.DonorBloodType = bloodType;
     
    //get addressID
    const _addressID = await DonoInfo.findOne({where: {DonorID: _donorID}});
    //update address
    await db.Address.update(
        {
            AddressStreet: address.street,
            AddressWard: address.ward,
            AddressDistrict: address.district,
            AddressProvince: address.province,
        }, 
        {
            where: {AddressID: _addressID.DonorAddress}
        }
    );    
    _updateData.DonorPhoneNumber = phoneNumber;
    _updateData.DonorPhoto = photo;
    _updateData.DonorEmail = email;
    await DonoInfo.update(_updateData, {where: {DonorID: _donorID}});
    //update illness
    //delete current user illness
    await db.Medical_History.destroy({where: {DonorID: _donorID}});
    //insert new illness
    for(let i = 0; i < selectedIllnessList.length; i++)
    {
        await db.Medical_History.create({DonorID: _donorID, IllnessID: selectedIllnessList[i]});
    }
    console.log('update profile');
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