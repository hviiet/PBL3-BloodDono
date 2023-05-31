const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const db = require('../models');
const { uploadImage, deleteLocalImage } = require('../utils/uploadImage');
const { getDonorIDByUserName } = require('../utils/util');


const updateProfile = asyncHandler(async (req, res) => {
    const DonoInfo = db.Donor_Information;
    const donorID = req.user.donorID;
    const { name, gender, birth, height, weight, bloodType, address, phoneNumber, photo, email, selectedIllnessList } = req.body;
    let updateData = {};
    updateData.DonorName = name;
    updateData.Gender = gender;
    updateData.DonorBirth = birth;
    updateData.DonorHeight = height;
    updateData.DonorWeight = weight;
    updateData.DonorBloodType = bloodType;

    //get addressID
    const _addressID = await DonoInfo.findOne({ where: { DonorID: donorID } });
    //update address
    await db.Address.update(
        {
            AddressStreet: address.street,
            AddressWard: address.ward,
            AddressDistrict: address.district,
            AddressProvince: address.province,
        },
        {
            where: { AddressID: _addressID.DonorAddress }
        }
    );
    updateData.DonorPhoneNumber = phoneNumber;
    updateData.DonorPhoto = photo;
    updateData.DonorEmail = email;
    await DonoInfo.update(updateData, { where: { DonorID: donorID } });
    //update illness
    //delete current user illness
    await db.Medical_History.destroy({ where: { DonorID: donorID } });
    //insert new illness
    for (let i = 0; i < selectedIllnessList.length; i++) {
        await db.Medical_History.create({ DonorID: donorID, IllnessID: selectedIllnessList[i] });
    }
    res.status(200).json({ message: 'Profile updated' });
});

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, username } = req.body;
    const AccountInfo = db.Account_Information;
    const user = await AccountInfo.findOne({ where: { Username: username } });
    if (!oldPassword) {
        return res.status(400).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(oldPassword, user.Password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    await AccountInfo.update({ Password: hashedPassword }, { where: { Username: username } });
    res.status(200).json({ message: 'Password updated' });
});
const uploadImageForProfile = asyncHandler(async (req, res) => {
    //upload image to imgur
    const pathToImage = req.file.path;
    const imageLink = await uploadImage(pathToImage);
    deleteLocalImage(pathToImage);
    //update image link to database
    const donorID = await getDonorIDByUserName(req.params.username);
    console.log(donorID);
    console.log(imageLink);
    await db.Donor_Information.update({ DonorPhoto: imageLink }, { where: { DonorID: donorID } });
    res.status(200).json({ imageLink: imageLink });
});
module.exports = { updatePassword, updateProfile, uploadImageForProfile }