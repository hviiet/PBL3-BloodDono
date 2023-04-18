var DataTypes = require("sequelize").DataTypes;
var _account_information = require("./account_information");
var _address = require("./address");
var _affected_blood_type = require("./affected_blood_type");
var _affected_location = require("./affected_location");
var _district_information = require("./district_information");
var _donation_records = require("./donation_records");
var _donor_information = require("./donor_information");
var _event_information = require("./event_information");
var _hospital_information = require("./hospital_information");
var _illness_reference = require("./illness_reference");
var _image_table = require("./image_table");
var _joined_donor = require("./joined_donor");
var _medical_history = require("./medical_history");
var _province_information = require("./province_information");
var _seen_donor = require("./seen_donor");
var _sysdiagrams = require("./sysdiagrams");
var _ward_information = require("./ward_information");

function initModels(sequelize) {
  var account_information = _account_information(sequelize, DataTypes);
  var address = _address(sequelize, DataTypes);
  var affected_blood_type = _affected_blood_type(sequelize, DataTypes);
  var affected_location = _affected_location(sequelize, DataTypes);
  var district_information = _district_information(sequelize, DataTypes);
  var donation_records = _donation_records(sequelize, DataTypes);
  var donor_information = _donor_information(sequelize, DataTypes);
  var event_information = _event_information(sequelize, DataTypes);
  var hospital_information = _hospital_information(sequelize, DataTypes);
  var illness_reference = _illness_reference(sequelize, DataTypes);
  var image_table = _image_table(sequelize, DataTypes);
  var joined_donor = _joined_donor(sequelize, DataTypes);
  var medical_history = _medical_history(sequelize, DataTypes);
  var province_information = _province_information(sequelize, DataTypes);
  var seen_donor = _seen_donor(sequelize, DataTypes);
  var sysdiagrams = _sysdiagrams(sequelize, DataTypes);
  var ward_information = _ward_information(sequelize, DataTypes);

  donor_information.belongsTo(account_information, { as: "Account", foreignKey: "AccountID"});
  account_information.hasMany(donor_information, { as: "donor_informations", foreignKey: "AccountID"});
  hospital_information.belongsTo(account_information, { as: "Account", foreignKey: "AccountID"});
  account_information.hasMany(hospital_information, { as: "hospital_informations", foreignKey: "AccountID"});
  donor_information.belongsTo(address, { as: "DonorAddress_address", foreignKey: "DonorAddress"});
  address.hasMany(donor_information, { as: "donor_informations", foreignKey: "DonorAddress"});
  event_information.belongsTo(address, { as: "EventDonationPoint_address", foreignKey: "EventDonationPoint"});
  address.hasMany(event_information, { as: "event_informations", foreignKey: "EventDonationPoint"});
  hospital_information.belongsTo(address, { as: "HospitalAddress_address", foreignKey: "HospitalAddress"});
  address.hasMany(hospital_information, { as: "hospital_informations", foreignKey: "HospitalAddress"});
  address.belongsTo(district_information, { as: "AddressDistrict_district_information", foreignKey: "AddressDistrict"});
  district_information.hasMany(address, { as: "addresses", foreignKey: "AddressDistrict"});
  affected_location.belongsTo(district_information, { as: "AffectedDistrict_district_information", foreignKey: "AffectedDistrict"});
  district_information.hasMany(affected_location, { as: "affected_locations", foreignKey: "AffectedDistrict"});
  donation_records.belongsTo(donor_information, { as: "Donor", foreignKey: "DonorID"});
  donor_information.hasMany(donation_records, { as: "donation_records", foreignKey: "DonorID"});
  joined_donor.belongsTo(donor_information, { as: "Donor", foreignKey: "DonorID"});
  donor_information.hasMany(joined_donor, { as: "joined_donors", foreignKey: "DonorID"});
  medical_history.belongsTo(donor_information, { as: "Donor", foreignKey: "DonorID"});
  donor_information.hasMany(medical_history, { as: "medical_histories", foreignKey: "DonorID"});
  seen_donor.belongsTo(donor_information, { as: "Seen_Donor_donor_information", foreignKey: "Seen_Donor"});
  donor_information.hasMany(seen_donor, { as: "seen_donors", foreignKey: "Seen_Donor"});
  affected_blood_type.belongsTo(event_information, { as: "Event", foreignKey: "EventID"});
  event_information.hasMany(affected_blood_type, { as: "affected_blood_types", foreignKey: "EventID"});
  affected_location.belongsTo(event_information, { as: "Event", foreignKey: "EventID"});
  event_information.hasMany(affected_location, { as: "affected_locations", foreignKey: "EventID"});
  joined_donor.belongsTo(event_information, { as: "Event", foreignKey: "EventID"});
  event_information.hasMany(joined_donor, { as: "joined_donors", foreignKey: "EventID"});
  seen_donor.belongsTo(event_information, { as: "Event", foreignKey: "EventID"});
  event_information.hasMany(seen_donor, { as: "seen_donors", foreignKey: "EventID"});
  event_information.belongsTo(hospital_information, { as: "Hospital", foreignKey: "HospitalID"});
  hospital_information.hasMany(event_information, { as: "event_informations", foreignKey: "HospitalID"});
  medical_history.belongsTo(illness_reference, { as: "Illness", foreignKey: "IllnessID"});
  illness_reference.hasMany(medical_history, { as: "medical_histories", foreignKey: "IllnessID"});
  address.belongsTo(province_information, { as: "AddressProvince_province_information", foreignKey: "AddressProvince"});
  province_information.hasMany(address, { as: "addresses", foreignKey: "AddressProvince"});
  affected_location.belongsTo(province_information, { as: "AffectedProvince_province_information", foreignKey: "AffectedProvince"});
  province_information.hasMany(affected_location, { as: "affected_locations", foreignKey: "AffectedProvince"});
  address.belongsTo(ward_information, { as: "AddressWard_ward_information", foreignKey: "AddressWard"});
  ward_information.hasMany(address, { as: "addresses", foreignKey: "AddressWard"});
  affected_location.belongsTo(ward_information, { as: "AffectedWard_ward_information", foreignKey: "AffectedWard"});
  ward_information.hasMany(affected_location, { as: "affected_locations", foreignKey: "AffectedWard"});

  return {
    account_information,
    address,
    affected_blood_type,
    affected_location,
    district_information,
    donation_records,
    donor_information,
    event_information,
    hospital_information,
    illness_reference,
    image_table,
    joined_donor,
    medical_history,
    province_information,
    seen_donor,
    sysdiagrams,
    ward_information,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
