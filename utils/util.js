const db = require('../models');

//others
async function getOneUser(username) {
    const AccountInfo = db.Account_Information;
    //get account id from username
    const account = await AccountInfo.findOne({ where: { Username: username } });
    let data = {};
    if (!account) {
        data = {
            status: 'fail',
            message: 'User not found'
        }
        return data;
    }
    //get user info
    if (account.Role == 1) {
        const DonoInfo = db.Donor_Information;
        const userInfo = await DonoInfo.findOne({ where: { AccountID: account.AccountID } });
        const address = await getFullAddress(userInfo.DonorAddress);
        let addressData = {};
        if (address.status == 'fail') {
            addressData = {
                street: '',
                ward: '',
                district: '',
                province: ''
            }
        }
        else {
            addressData = {
                street: address.street,
                ward: address.ward,
                district: address.district,
                province: address.province
            }
        }
        data = {
            name: userInfo.DonorName,
            gender: userInfo.DonorGender,
            birth: userInfo.DonorBirth,
            height: userInfo.DonorHeight,
            weight: userInfo.DonorWeight,
            bloodType: userInfo.DonorBloodType,
            address: addressData,
            phoneNumber: userInfo.DonorPhoneNumber,
            photo: userInfo.DonorPhoto,
            email: userInfo.DonorEmail
        }
    }
    else if (account.Role == 2) {
        const HospitalInfo = db.Hospital_Information;
        const userInfo = await HospitalInfo.findOne({ where: { AccountID: account.AccountID } });
        const address = await getFullAddress(userInfo.HospitalAddress);
        let addressData = {};
        if (address.status == 'fail') {
            addressData = {
                street: '',
                ward: '',
                district: '',
                province: ''
            }
        }
        else {
            addressData = {
                street: address.street,
                ward: address.ward,
                district: address.district,
                province: address.province
            }
        }
        data = {
            name: userInfo.HospitalName,
            address: addressData,
            phoneNumber: userInfo.HospitalPhoneNumber,
            email: userInfo.HospitalEmail,
            isVerified: userInfo.HospitalIsVerified
        }
    }
    //return user info
    return data;
}
async function getOneEvent(eventID) {
    const Event = db.Event_Information;
    const event = await Event.findOne({
        where: { EventID: eventID }
    });
    if (event == null) {
        return { status: 'fail' };
    }
    const addressData = await getFullAddress(event.EventDonationPoint);
    const HospitalInfo = db.Hospital_Information;
    const hospital = await HospitalInfo.findOne({ where: { HospitalID: event.HospitalID } });
    const name = hospital.HospitalName;
    const data = {
        eventID: event.EventID,
        name: event.EventName,
        hospital: name,
        timeTag: event.EventTimetag,
        startTime: event.EventStartTime,
        endTime: event.EventEndTime,
        quantity: event.EventQuantity,
        address: {
            street: addressData.street,
            ward: addressData.ward,
            district: addressData.district,
            province: addressData.province
        }
    };
    return { data }
}
async function getNextID(tableName, columnName) {
    const Table = db[tableName];
    const currentID = await Table.findOne({
        order: [[columnName, 'DESC']]
    });
    let _nextAccountID = "00000001";
    const _lastAccountIDNumber = parseInt(currentID[columnName], 10);
    _nextAccountID = (_lastAccountIDNumber + 1).toString().padStart(8, "0");
    return _nextAccountID;
}
//address
async function getAllProvince() {
    const Province = db.Province_Information;
    const province = await Province.findAll({});
    return province;
}
async function getDistrictByProvinceID(provinceID) {
    const District = db.District_Information;
    const district = await District.findAll({
        where: { Province_id: provinceID },
        attributes: ['District_id', 'Name']
    });
    return district;
}
async function getWardByDistrictID(districtID) {
    const Ward = db.Ward_Information;
    const ward = await Ward.findAll({
        where: { District_id: districtID },
        attributes: ['Wards_id', 'Name']
    });
    return ward;
}
async function createNewAddress(street, ward, district, province) {
    const Address = db.Address;
    const _newAddressID = await getNextID('Address', 'AddressID');
    await Address.create({
        AddressID: _newAddressID,
        AddressStreet: street,
        AddressWard: ward,
        AddressDistrict: district,
        AddressProvince: province
    });
    return _newAddressID;
}
async function getFullAddress(addressID) {
    let data = {};
    const address = await db.Address.findOne({ where: { AddressID: addressID } });
    if (!address) {
        data = {
            status: 'fail',
            message: 'Address not found'
        }
        return data;
    }
    const query = `
    SELECT Ward_Information.Name as wardName,  District_Information.name as districtName, Province_Information.name as provinceName
    FROM Ward_Information INNER JOIN 
        (District_Information INNER JOIN Province_Information ON District_Information.Province_id = Province_Information.Province_id)
    ON District_Information.District_id = Ward_Information.District_id
    WHERE Wards_id = ${address.AddressWard} and District_Information.District_id = ${address.AddressDistrict} and Province_Information.Province_id = ${address.AddressProvince};
    `;
    const result = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
    data = {
        status: 'success',
        street: address.AddressStreet,
        ward: result[0].wardName,
        district: result[0].districtName,
        province: result[0].provinceName
    }
    return data;
}

//user
async function getDonorIDByUserName(username) {
    const AccountInfo = db.Account_Information;
    const account = await AccountInfo.findOne({ where: { Username: username } });
    if (!account) {
        return { status: 'fail', message: 'Account not found' };
    }
    const DonoInfo = db.Donor_Information;
    const donor = await DonoInfo.findOne({ where: { AccountID: account.AccountID } });
    if (!donor) {
        return { status: 'fail', message: 'Donor not found' };
    }
    return donor.DonorID;
}
async function getHospitalIDByUserName(username) {
    const AccountInfo = db.Account_Information;
    const account = await AccountInfo.findOne({ where: { Username: username } });
    if (!account) {
        return { status: 'fail', message: 'Account not found' };
    }
    const HospitalInfo = db.Hospital_Information;
    const hospital = await HospitalInfo.findOne({ where: { AccountID: account.AccountID } });
    if (!hospital) {
        return { status: 'fail', message: 'Hospital not found' };
    }
    return hospital.HospitalID;
}
async function checkEventExist(eventID) {
    const event = await db.Event_Information.findOne({ where: { EventID: eventID } });
    if (!event) {
        return { status: 'fail' };
    }
    return { status: 'success' };
}

module.exports = {
    getOneUser,
    getOneEvent,
    getNextID,
    getFullAddress,
    createNewAddress,
    getAllProvince,
    getDistrictByProvinceID,
    getWardByDistrictID,
    getDonorIDByUserName,
    getHospitalIDByUserName,
    checkEventExist
}
