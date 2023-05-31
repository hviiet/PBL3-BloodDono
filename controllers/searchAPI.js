const asyncHandler = require('express-async-handler');
const url = require('url');
const { QueryTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const { getFullAddress } = require('../utils/util');
const db = require('../models');

const searchByBloodTypeAndAddress = asyncHandler(async (req, res) => {
  const stringQuery = url.parse(req.url, true);
  const _bloodType = stringQuery.query.bloodType;
  const _ward = stringQuery.query.ward;
  const _district = stringQuery.query.district;
  const _province = stringQuery.query.province;
  let query = 'SELECT DonorName, DonorBloodType, DonorBirth, DonorPhoneNumber, DonorAddress, DonorEmail, AddressID, DonorID, DonorPhoto  FROM Donor_Information INNER JOIN Address ON Donor_Information.DonorAddress = Address.AddressID';
  if (_bloodType != undefined || _ward != undefined || _district != undefined || _province != undefined) {
    query += ' WHERE ';
    if (_bloodType != undefined)
      query += `DonorBloodType = '${_bloodType}' AND `;
    if (_ward != undefined)
      query += `Address.AddressWard = ${_ward} AND `;
    if (_district != undefined)
      query += `Address.AddressDistrict = ${_district} AND `;
    if (_province != undefined)
      query += `Address.AddressProvince = ${_province} AND `;
    query = query.slice(0, -4);
  }
  const _result = await sequelize.query(query, { type: QueryTypes.SELECT });
  const DonationRecord = db.Donation_Records;
  for (let i = 0; i < _result.length; i++) {
    const _donationRecord = await DonationRecord.findOne({
      where: {
        DonorID: _result[i].DonorID
      },
      order: [
        ['DonationDate', 'DESC']
      ]
    });
    if (_donationRecord != null) {
      _result[i].DonationDate = _donationRecord.DonationDate;
    }
    //get full address
    const address = await getFullAddress(_result[i].DonorAddress);
    if (address.status == 'fail') {
      _result[i].DonorAddress = '';
    }
    else {
      _result[i].DonorAddress = `${address.ward}, ${address.district}, ${address.province}`;
    }
  }
  res.json({ result: _result });
});

module.exports = { searchByBloodTypeAndAddress }