const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hospital_Information', {
    AccountID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Account_Information',
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
        model: 'Address',
        key: 'AddressID'
      }
    },
    HospitalEmail: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    HospitalIsVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Hospital_Information',
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
