const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donation_records', {
    DonationID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'donor_information',
        key: 'DonorID'
      }
    },
    DonationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DonationStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    DonationVolume: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'donation_records',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "DonationID" },
        ]
      },
      {
        name: "FK_Donation_Records_Donor_Information",
        using: "BTREE",
        fields: [
          { name: "DonorID" },
        ]
      },
    ]
  });
};
