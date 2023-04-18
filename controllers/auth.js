require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const login = asyncHandler(async (req, res) => 
{
    AccountInfo = db.account_information;
    const {username, password} = req.body;
    //check if user exists
    const userExists = await AccountInfo.findOne({ where: { Username: username } });
    if(!userExists) return res.status(400).json({status:'fail', message: 'User not found' });
    //check if password is correct
    const validPassword = await bcrypt.compare(password, userExists.Password);
    if(!validPassword) return res.status(400).json({status:'fail', message: 'Invalid password' });
    //create and assign a token
    const user = {
        username : userExists.Username,
        role : userExists.Role
    };
    const accessToken = jwt.sign( user, process.env.Access_Token_Secret, { expiresIn: '1h' });
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('/');
});
const register = asyncHandler(async (req, res) => 
{
    AccountInfo = db.account_information;
    const {username, password, role} = req.body;
    //check if user exists
    const userExists = await AccountInfo.findOne({ where: { Username: username } });
    if (userExists) 
        return res.status(400).json({ message: 'User already exists' });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //create account ID
    const lastAccountInfo = await AccountInfo.findOne({
        order: [['AccountID', 'DESC']]
      });
    
    let nextAccountID = "00000001";
    if (lastAccountInfo) {
    const lastAccountIDNumber = parseInt(lastAccountInfo.AccountID, 10);
    nextAccountID = (lastAccountIDNumber + 1).toString().padStart(8, "0");
    }
    //create user
    const user = await AccountInfo.create({
        AccountID: `${nextAccountID}`,
        Username: `${username}`,
        Password: `${hashedPassword}`,
        Role: parseInt(role),
    });
    if(parseInt(role) === 1)
    {
        DonoInfo = db.donor_information;
        const {name, gender, birth, heigh, weight, bloodType, address, phoneNumber, photo, email } = req.body;
    }
    else if(parseInt(role) === 2)
    {
        HospitalInfo = db.hospital_information;
        const {name, address, phoneNumber, email } = req.body;
    }

    //check if user created successfully
    if (!user)
        return res.status(400).json({ message: 'User not created' });
    else 
        res.status(200).json({ message: 'User created' , user: user});
});
const logout = asyncHandler(async (req, res) => {
    if(req.session.user && req.cookies.user_sid) {
        res.clearCookie('accessToken');
        res.status(200).json({ message: 'User logged out' });
    } else {
        res.status(400).json({ message: 'User not logged in' });
    }
});
module.exports = {login, register, logout};
