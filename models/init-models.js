var DataTypes = require("sequelize").DataTypes;
var _Account_Information = require("./Account_Information");
var _Address = require("./Address");
var _Affected_Blood_Type = require("./Affected_Blood_Type");
var _District_Information = require("./District_Information");
var _Donation_Records = require("./Donation_Records");
var _Donor_Information = require("./Donor_Information");
var _Event_Information = require("./Event_Information");
var _Feedback = require("./Feedback");
var _Find_Donor = require("./Find_Donor");
var _Hospital_Information = require("./Hospital_Information");
var _Illness_Reference = require("./Illness_Reference");
var _Image_Table = require("./Image_Table");
var _Joined_Donor = require("./Joined_Donor");
var _Medical_History = require("./Medical_History");
var _Province_Information = require("./Province_Information");
var _Ward_Information = require("./Ward_Information");
var _sysdiagrams = require("./sysdiagrams");

function initModels(sequelize) {
  var Account_Information = _Account_Information(sequelize, DataTypes);
  var Address = _Address(sequelize, DataTypes);
  var Affected_Blood_Type = _Affected_Blood_Type(sequelize, DataTypes);
  var District_Information = _District_Information(sequelize, DataTypes);
  var Donation_Records = _Donation_Records(sequelize, DataTypes);
  var Donor_Information = _Donor_Information(sequelize, DataTypes);
  var Event_Information = _Event_Information(sequelize, DataTypes);
  var Feedback = _Feedback(sequelize, DataTypes);
  var Find_Donor = _Find_Donor(sequelize, DataTypes);
  var Hospital_Information = _Hospital_Information(sequelize, DataTypes);
  var Illness_Reference = _Illness_Reference(sequelize, DataTypes);
  var Image_Table = _Image_Table(sequelize, DataTypes);
  var Joined_Donor = _Joined_Donor(sequelize, DataTypes);
  var Medical_History = _Medical_History(sequelize, DataTypes);
  var Province_Information = _Province_Information(sequelize, DataTypes);
  var Ward_Information = _Ward_Information(sequelize, DataTypes);
  var sysdiagrams = _sysdiagrams(sequelize, DataTypes);

  Donor_Information.belongsTo(Account_Information, { as: "Account", foreignKey: "AccountID"});
  Account_Information.hasMany(Donor_Information, { as: "Donor_Informations", foreignKey: "AccountID"});
  Hospital_Information.belongsTo(Account_Information, { as: "Account", foreignKey: "AccountID"});
  Account_Information.hasMany(Hospital_Information, { as: "Hospital_Informations", foreignKey: "AccountID"});
  Donor_Information.belongsTo(Address, { as: "DonorAddress_Address", foreignKey: "DonorAddress"});
  Address.hasMany(Donor_Information, { as: "Donor_Informations", foreignKey: "DonorAddress"});
  Event_Information.belongsTo(Address, { as: "EventDonationPoint_Address", foreignKey: "EventDonationPoint"});
  Address.hasMany(Event_Information, { as: "Event_Informations", foreignKey: "EventDonationPoint"});
  Find_Donor.belongsTo(Address, { as: "GivingAddress_Address", foreignKey: "GivingAddress"});
  Address.hasMany(Find_Donor, { as: "Find_Donors", foreignKey: "GivingAddress"});
  Hospital_Information.belongsTo(Address, { as: "HospitalAddress_Address", foreignKey: "HospitalAddress"});
  Address.hasMany(Hospital_Information, { as: "Hospital_Informations", foreignKey: "HospitalAddress"});
  Address.belongsTo(District_Information, { as: "AddressDistrict_District_Information", foreignKey: "AddressDistrict"});
  District_Information.hasMany(Address, { as: "Addresses", foreignKey: "AddressDistrict"});
  Donation_Records.belongsTo(Donor_Information, { as: "Donor", foreignKey: "DonorID"});
  Donor_Information.hasMany(Donation_Records, { as: "Donation_Records", foreignKey: "DonorID"});
  Joined_Donor.belongsTo(Donor_Information, { as: "Donor", foreignKey: "DonorID"});
  Donor_Information.hasMany(Joined_Donor, { as: "Joined_Donors", foreignKey: "DonorID"});
  Medical_History.belongsTo(Donor_Information, { as: "Donor", foreignKey: "DonorID"});
  Donor_Information.hasMany(Medical_History, { as: "Medical_Histories", foreignKey: "DonorID"});
  Affected_Blood_Type.belongsTo(Event_Information, { as: "Event", foreignKey: "EventID"});
  Event_Information.hasMany(Affected_Blood_Type, { as: "Affected_Blood_Types", foreignKey: "EventID"});
  Joined_Donor.belongsTo(Event_Information, { as: "Event", foreignKey: "EventID"});
  Event_Information.hasMany(Joined_Donor, { as: "Joined_Donors", foreignKey: "EventID"});
  Event_Information.belongsTo(Hospital_Information, { as: "Hospital", foreignKey: "HospitalID"});
  Hospital_Information.hasMany(Event_Information, { as: "Event_Informations", foreignKey: "HospitalID"});
  Medical_History.belongsTo(Illness_Reference, { as: "Illness", foreignKey: "IllnessID"});
  Illness_Reference.hasMany(Medical_History, { as: "Medical_Histories", foreignKey: "IllnessID"});
  Donor_Information.belongsTo(Image_Table, { as: "DonorPhoto_Image_Table", foreignKey: "DonorPhoto"});
  Image_Table.hasMany(Donor_Information, { as: "Donor_Informations", foreignKey: "DonorPhoto"});
  Address.belongsTo(Province_Information, { as: "AddressProvince_Province_Information", foreignKey: "AddressProvince"});
  Province_Information.hasMany(Address, { as: "Addresses", foreignKey: "AddressProvince"});
  Address.belongsTo(Ward_Information, { as: "AddressWard_Ward_Information", foreignKey: "AddressWard"});
  Ward_Information.hasMany(Address, { as: "Addresses", foreignKey: "AddressWard"});

  return {
    Account_Information,
    Address,
    Affected_Blood_Type,
    District_Information,
    Donation_Records,
    Donor_Information,
    Event_Information,
    Feedback,
    Find_Donor,
    Hospital_Information,
    Illness_Reference,
    Image_Table,
    Joined_Donor,
    Medical_History,
    Province_Information,
    Ward_Information,
    sysdiagrams,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
