const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Donation_Records', {
    DonationID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Donor_Information',
        key: 'DonorID'
      }
    },
    DonationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DonationVolume: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Donation_Records',
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
