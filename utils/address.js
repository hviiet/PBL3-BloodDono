const db = require('../models');

async function getAddress(addressID) 
{
    let data = {};
    const Address = db.address;
    const Ward = db.ward_information;
    const District = db.district_information;
    const Province = db.province_information;
    const address = await Address.findOne({ where: { AddressID: addressID } });
    if(!address) 
    {
        data = {
            status : 'fail',
            message: 'Address not found'
        }
        return data;
    }
    const ward = await Ward.findOne({ where: { Wards_id: address.AddressWard } });
    const district = await District.findOne({ where: { District_id: address.AddressDistrict } });
    const province = await Province.findOne({ where: { Province_id: address.AddressProvince } });
    data = {
        status: 'success',
        street: address.AddressStreet,
        ward: ward.Name,
        district: district.Name,
        province: province.Name
    }
    return data;
}
async function getUser(username)
{
    const AccountInfo = db.account_information;
    //get account id from username
    const account = await AccountInfo.findOne({ where: { Username: username } });
    let data = {};
    if(!account) 
    {
        data = {
            status : 'fail',
            message: 'User not found'
        }
        return data;
    }
    //get user info
    if(account.Role == 1)
    {        
        const DonoInfo = db.donor_information;
        const userInfo = await DonoInfo.findOne({ where: { AccountID: account.AccountID } });
        const address = await getAddress(userInfo.DonorAddress);
        let addressData = {};
        if(address.status == 'fail')
        {
            addressData = {
                street: '',
                ward: '',
                district: '',
                province: ''
            }
        }
        else 
        {
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
    else if(account.Role == 2)
    {   
        const HospitalInfo = db.hospital_information;
        const userInfo = await HospitalInfo.findOne({ where: { AccountID: account.AccountID } });
        const address = await getAddress(userInfo.HospitalAddress);
        let addressData = {};
        if(address.status == 'fail') 
        {
            addressData = {
                street: '',
                ward: '',
                district: '',
                province: ''
            }
        }
        else 
        {
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
            email: userInfo.HospitalEmail
        }        
    }
    //return user info
    return data;
}
module.exports = {getAddress, getUser}
