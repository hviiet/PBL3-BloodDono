const db = require('../models');
const asyncHandler = require('express-async-handler');

const getAllIllness = asyncHandler(async (req,res)=>
{
    const IllnessInfo = db.Illness_Reference;
    const _result = await IllnessInfo.findAll({});
    res.status(200).json({status: 'success', data: _result});
});

module.exports = {getAllIllness}