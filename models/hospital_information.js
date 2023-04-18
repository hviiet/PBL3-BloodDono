const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hospital_information', {
    AccountID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'account_information',
        key: 'AccountID'
      }
    },
    HospitalID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    HospitalName: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    HospitalPhoneNumber: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    HospitalAddress: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'address',
        key: 'AddressID'
      }
    },
    HospitalEmail: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hospital_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "HospitalID" },
        ]
      },
      {
        name: "FK_Hospital_Information_Account_Information",
        using: "BTREE",
        fields: [
          { name: "AccountID" },
        ]
      },
      {
        name: "FK_Hospital_Information_Address",
        using: "BTREE",
        fields: [
          { name: "HospitalAddress" },
        ]
      },
    ]
  });
};
