const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Donor_Information', {
    AccountID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Account_Information',
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
    DonorWeight: {
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
        model: 'Address',
        key: 'AddressID'
      }
    },
    DonorPhoneNumber: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    DonorPhoto: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      references: {
        model: 'Image_Table',
        key: 'ImageID'
      }
    },
    DonorEmail: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Donor_Information',
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
      {
        name: "FK_Donor_Information_Image_Table",
        using: "BTREE",
        fields: [
          { name: "DonorPhoto" },
        ]
      },
    ]
  });
};
