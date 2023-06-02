const asyncHandler = require('express-async-handler');
const url = require('url');
const { QueryTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const { getFullAddress } = require('../utils/util');
const db = require('../models');

const searchByBloodTypeAndAddress = asyncHandler(async (req, res) => {
  const stringQuery = url.parse(req.url, true);
  const bloodType = stringQuery.query.bloodType;
  const ward = stringQuery.query.ward;
  const district = stringQuery.query.district;
  const province = stringQuery.query.province;
  let query = 'SELECT DonorName, DonorBloodType, DonorBirth, DonorPhoneNumber, DonorAddress, DonorEmail, AddressID, DonorID, DonorPhoto  FROM Donor_Information INNER JOIN Address ON Donor_Information.DonorAddress = Address.AddressID';
  if (bloodType != undefined || ward != undefined || district != undefined || province != undefined) {
    query += ' WHERE ';
    if (bloodType != undefined)
      query += `DonorBloodType = '${bloodType}' AND `;
    if (ward != undefined)
      query += `Address.AddressWard = ${ward} AND `;
    if (district != undefined)
      query += `Address.AddressDistrict = ${district} AND `;
    if (province != undefined)
      query += `Address.AddressProvince = ${province} AND `;
    query = query.slice(0, -4);
  }
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  const DonationRecord = db.Donation_Records;
  for (let i = 0; i < result.length; i++) {
    const donationRecord = await DonationRecord.findOne({
      where: {
        DonorID: result[i].DonorID
      },
      order: [
        ['DonationDate', 'DESC']
      ]
    });
    if (donationRecord != null) {
      result[i].DonationDate = donationRecord.DonationDate;
    }
    //get full address
    const address = await getFullAddress(result[i].DonorAddress);
    if (address.status == 'fail') {
      result[i].DonorAddress = '';
    }
    else {
      result[i].DonorAddress = `${address.ward}, ${address.district}, ${address.province}`;
    }
  }
  res.json({ result: result });
});
const searchHospitalByAddress = asyncHandler(async (req, res) => {
  const stringQuery = url.parse(req.url, true);
  const district = stringQuery.query.district;
  const province = stringQuery.query.province;
  let query = 'SELECT HospitalName, HospitalAddress FROM Hospital_Information INNER JOIN Address ON Hospital_Information.HospitalAddress = Address.AddressID';
  if (district != undefined || province != undefined) {
    query += ' WHERE ';
    if (district != undefined)
      query += `Address.AddressDistrict = ${district} AND `;
    if (province != undefined)
      query += `Address.AddressProvince = ${province} AND `;
    query = query.slice(0, -4);
  }
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  for (let i = 0; i < result.length; i++) {
    const address = await getFullAddress(result[i].HospitalAddress);
    result[i].HospitalAddress = `${address.street ?? ''}, ${address.ward}, ${address.district}, ${address.province}`;
  }


  res.json({ result: result });
});
module.exports = { searchByBloodTypeAndAddress, searchHospitalByAddress }