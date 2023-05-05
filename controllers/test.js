const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const { uploadImage, deleteLocalImage } = require('../utils/uploadImage');

// const  {getAllIllness} = require('../controllers/userAPI');

const updatePassword = asyncHandler(async (req, res) => {
    const AccountInfo = db.Account_Information;
    const account = await AccountInfo.findAll({});
    //update all password to hashed
    for(let i = 0; i < account.length; i++)
    {
        const _salt = bcrypt.genSaltSync(10);
        const _hashedPassword = bcrypt.hashSync(account[i].Password, _salt);
        await AccountInfo.update({Password: _hashedPassword}, {where: {AccountID: account[i].AccountID}});
    }
    res.end('updated');
});

const testF = asyncHandler(async (req, res) => {
    //upload image to imgur
    const _pathToImage = req.file.path;
    const _imageLink = await uploadImage(_pathToImage);
    deleteLocalImage(_pathToImage);
    res.status(200).json({imageLink: _imageLink});    
});

module.exports = {testF,updatePassword};