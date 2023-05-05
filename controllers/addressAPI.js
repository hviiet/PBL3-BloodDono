const asyncHandler = require('express-async-handler');
const {getAllProvince, getDistrictByProvinceID, getWardByDistrictID} = require('../utils/util');

const getProvince = asyncHandler(async (req, res) => 
{
    const province = await getAllProvince();
    res.json(province);
});
const getDistrict = asyncHandler(async (req, res) =>
{
    const district = await getDistrictByProvinceID(req.params.provinceID);
    res.json(district);
});
const getWard = asyncHandler(async (req, res) =>
{
    const ward = await getWardByDistrictID(req.params.districtID);
    res.json(ward);
});
module.exports = {getProvince, getDistrict, getWard}