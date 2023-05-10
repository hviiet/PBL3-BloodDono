const db = require('../models');
const asyncHandler = require('express-async-handler');
const {getDonorIDByUserName} = require('../utils/util');

const getAllIllness = asyncHandler(async (req,res)=>
{
    const IllnessInfo = db.Illness_Reference;
    const _result = await IllnessInfo.findAll({});
    res.status(200).json({status: 'success', data: _result});
});
const getIllnessByUsername = asyncHandler(async (req,res)=>
{ 
    const donorID = await getDonorIDByUserName(req.params.username);
    const MedicalHistory = db.Medical_History;
    const _illnessID = await MedicalHistory.findAll({where: {DonorID: donorID}});
    const IllnessInfo = db.Illness_Reference;
    const data = [];
    for(let i = 0; i < _illnessID.length; i++)
    {
        const _result = await IllnessInfo.findOne({where: {IllnessID: _illnessID[i].IllnessID}});
        data.push({IllnessID: _result.IllnessID, IllnessName: _result.IllnessName});
    }
    res.status(200).json({data: data});
});

module.exports = {getAllIllness,getIllnessByUsername}