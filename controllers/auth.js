require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { getNextID, createNewAddress } = require('../utils/util');

const login = asyncHandler(async (req, res) => {
    const AccountInfo = db.Account_Information;
    const { username, password } = req.body;
    //check if user exists
    const userExists = await AccountInfo.findOne({ where: { Username: username } });
    if (!userExists) return res.status(400).json({ status: 'fail', message: 'Không tìm thấy tài khoản' });
    //check if password is correct
    const validPassword = await bcrypt.compare(password, userExists.Password);
    if (!validPassword) return res.status(400).json({ status: 'fail', message: 'Mật khẩu không chính xác' });
    //create and assign a token
    let user;
    if (userExists.Role === 1) {
        const DonoInfo = db.Donor_Information;
        const donor = await DonoInfo.findOne({
            where: { AccountID: userExists.AccountID },
            attributes: ['DonorID'],
        });
        user = {
            username: userExists.Username,
            donorID: donor.DonorID,
            role: userExists.Role
        };
    }
    else if (userExists.Role === 2) {
        const HospitalInfo = db.Hospital_Information;
        const doctor = await HospitalInfo.findOne({
            where: { AccountID: userExists.AccountID },
            attributes: ['HospitalID', 'HospitalIsVerified'],
        });
        console.log(doctor.HospitalIsVerified);
        if (!doctor.HospitalIsVerified) return res.status(400).json({ status: 'fail', message: 'Tài khoản chưa được xác minh' });
        user = {
            username: userExists.Username,
            hospitalID: doctor.HospitalID,
            role: userExists.Role
        }
    }
    else if (userExists.Role === 3) {
        user = {
            username: userExists.Username,
            role: userExists.Role
        }
    }
    const accessToken = jwt.sign(user, process.env.Access_Token_Secret, { expiresIn: '1h' });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('/');
});
const register = asyncHandler(async (req, res) => {
    const AccountInfo = db.Account_Information;
    const { username, password, role } = req.body;
    //check if user exists
    const userExists = await AccountInfo.findOne({ where: { Username: username } });
    if (userExists)
        return res.status(400).json({ status: 'fail', message: 'Tài khoản đã tồn tại' });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //create account ID
    const AccountID = await getNextID('Account_Information', 'AccountID');
    //create user
    const user = await AccountInfo.create({
        AccountID: `${AccountID}`,
        Username: `${username}`,
        Password: `${hashedPassword}`,
        Role: parseInt(role)
    });
    if (!user)
        return res.status(400).json({ status: 'fail', message: 'Tài khoản chưa được tạo thành công' });
    //create donor
    if (parseInt(role) === 1) {
        const DonoInfo = db.Donor_Information;
        const { name, gender, birth, height, weight, bloodType, address, phoneNumber, email, selectedIllnessList } = req.body;
        const donorID = await getNextID('Donor_Information', 'DonorID');
        const addressID = await createNewAddress(address.street, address.ward, address.district, address.province);
        await DonoInfo.create({
            AccountID: AccountID,
            DonorID: donorID,
            DonorName: name,
            DonorGender: gender,
            DonorBirth: birth,
            DonorHeight: height,
            DonorWeight: weight,
            DonorBloodType: bloodType,
            DonorAddress: addressID,
            DonorPhoneNumber: phoneNumber,
            DonorEmail: email,
        });
        const MedicalHistory = db.Medical_History;
        for (let i = 0; i < selectedIllnessList.length; i++) {
            await MedicalHistory.create({
                DonorID: donorID,
                IllnessID: selectedIllnessList[i]
            });
        }
    }
    //create hospital
    else if (parseInt(role) === 2) {
        const HospitalInfo = db.Hospital_Information;
        const { name, address, phoneNumber, email } = req.body;
        const HospitalID = await getNextID('Hospital_Information', 'HospitalID');
        const addressID = await createNewAddress(address.street, address.ward, address.district, address.province);
        await HospitalInfo.create({
            AccountID: AccountID,
            HospitalID: HospitalID,
            HospitalName: name,
            HospitalAddress: addressID,
            HospitalPhoneNumber: phoneNumber,
            HospitalEmail: email,
        });
    }
    res.redirect('/login');
});
const logout = asyncHandler(async (req, res) => {
    if (req.cookies.accessToken) {
        res.clearCookie('accessToken');
    }
    res.redirect('/');
});
module.exports = { login, register, logout };
