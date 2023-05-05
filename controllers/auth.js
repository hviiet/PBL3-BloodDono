require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const {getNextID,createNewAddress} = require('../utils/util');

const login = asyncHandler(async (req, res) => 
{
    const AccountInfo = db.Account_Information;
    const {username, password} = req.body;
    //check if user exists
    const userExists = await AccountInfo.findOne({ where: { Username: username } });
    if(!userExists) return res.status(400).json({status:'fail', message: 'User not found' });
    //check if password is correct
    const validPassword = await bcrypt.compare(password, userExists.Password);
    if(!validPassword) return res.status(400).json({status:'fail', message: 'Invalid password' });
    //create and assign a token
    const DonoInfo = db.Donor_Information;
    const _donor = await DonoInfo.findOne({ 
        where: { AccountID: userExists.AccountID },
        attributes: ['DonorID'],
    });
    const user = {
        username : userExists.Username,
        donorID : _donor.DonorID,
        role : userExists.Role
    };
    const accessToken = jwt.sign( user, process.env.Access_Token_Secret, { expiresIn: '1h' });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('/');
});
const register = asyncHandler(async (req, res) => 
{
    const AccountInfo = db.Account_Information;
    const {username, password, role} = req.body;
    //check if user exists
    const _userExists = await AccountInfo.findOne({ where: { Username: username } });
    if (_userExists) 
        return res.status(400).json({ message: 'User already exists' });
    const _salt = bcrypt.genSaltSync(10);
    const _hashedPassword = bcrypt.hashSync(password, _salt);
    //create account ID
    console.log('1');
    const _AccountID = await getNextID('Account_Information', 'AccountID'); 
    //create user
    const _user = await AccountInfo.create({
        AccountID: `${_AccountID}`,
        Username: `${username}`,
        Password: `${_hashedPassword}`,
        Role: parseInt(role)
    });
    if(!_user)
        return res.status(400).json({ message: 'User not created, something is wrong!' });
    //create donor
    if(parseInt(role) === 1)
    {
        const DonoInfo = db.Donor_Information;
        const {name, gender, birth, height, weight, bloodType, address, phoneNumber, email, selectedIllnessList} = req.body;
        const _donorID = await getNextID('Donor_Information', 'DonorID');
        const _addressID = await createNewAddress(address.street, address.ward, address.district, address.province);
        await DonoInfo.create({
            AccountID : _AccountID,
            DonorID : _donorID,
            DonorName : name,
            DonorGender : gender,
            DonorBirth : birth,
            DonorHeight : height,
            DonorWeight : weight,
            DonorBloodType : bloodType,
            DonorAddress : _addressID,
            DonorPhoneNumber : phoneNumber,
            DonorEmail : email,
        });
        const MedicalHistory = db.Medical_History;
        for(let i = 0; i < selectedIllnessList.length; i++)
        {
            await MedicalHistory.create({
                DonorID : _donorID,
                IllnessID : selectedIllnessList[i]
            });
        }
    }
    //create hospital
    else if(parseInt(role) === 2)
    {
        const HospitalInfo = db.Hospital_Information;
        const {name, address, phoneNumber, email } = req.body;
        const _HospitalID = await getNextID('Hospital_Information', 'HospitalID');
        const _addressID = await createNewAddress(address.street, address.ward, address.district, address.province);
        await HospitalInfo.create({
            AccountID : _AccountID,
            HospitalID : _HospitalID,
            HospitalName : name,
            HospitalAddress : _addressID,
            HospitalPhoneNumber : phoneNumber,
            HospitalEmail : email,
        });
    }
    res.redirect('/login');
});
const logout = asyncHandler(async (req, res) => {
    if(req.cookies.accessToken) {
        res.clearCookie('accessToken');
    }
        res.redirect('/');
});
module.exports = {login, register, logout};
