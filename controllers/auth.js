require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { BDdata } = require('../config/dbConnect');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req, res) => {
    const { name, email } = req.body;   
    const sql1 = `SELECT * FROM users WHERE name = '${name}'`;
    BDdata.query(sql1, (err, result) => 
    {
        if (err) 
        {
            return res.status(500).json({status:'fail', message: err.message });
        }
        if(result.length === 0) 
        {
            return res.status(400).json({status:'fail', message: 'User not found' });
        }
        const validPassword = bcrypt.compareSync(email, result[0].email);
        if(!validPassword)
        {
            return res.status(400).json({status:'fail', message: 'Invalid password' });
        }
        const user = 
        {
            name: result[0].name
        };
        const accessToken = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', accessToken, { httpOnly: true });
        // return res.status(200).json({ status : 'success', message: 'User logged in' });
        res.redirect('/');
    });
});
const register = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const sql1 = `SELECT * FROM users WHERE name = '${name}'`;
    BDdata.query(sql1, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if(result.length > 0) return res.status(400).json({ message: 'User already exists' });
        const salt = bcrypt.genSaltSync(10);
        const hashedEmail = bcrypt.hashSync(email, salt);
        const sql2 = `INSERT INTO users (name, email) VALUES ('${name}', '${hashedEmail}')`;
        BDdata.query(sql2, (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(200).json({ message: 'User created' });
        });
    });
});
const logout = asyncHandler(async (req, res) => {
    if(req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.status(200).json({ message: 'User logged out' });
    } else {
        res.status(400).json({ message: 'User not logged in' });
    }
});
module.exports = {login, register, logout};
