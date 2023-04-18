const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donor_information', {
    AccountID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'account_information',
        key: 'AccountID'
      }
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    DonorName: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    DonorGender: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    DonorBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DonorHeight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DonorWeigth: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    DonorBloodType: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    DonorAddress: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'address',
        key: 'AddressID'
      }
    },
    DonorPhoneNumber: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    DonorPhoto: {
      type: DataTypes.CHAR(8),
      allowNull: true
    },
    DonorEmail: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'donor_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DonorID" },
        ]
      },
      {
        name: "FK_Donor_Information_Account_Information",
        using: "BTREE",
        fields: [
          { name: "AccountID" },
        ]
      },
      {
        name: "FK_Donor_Information_Address",
        using: "BTREE",
        fields: [
          { name: "DonorAddress" },
        ]
      },
    ]
  });
};
