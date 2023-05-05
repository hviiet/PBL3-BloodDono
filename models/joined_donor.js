const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Joined_Donor', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Event_Information',
        key: 'EventID'
      }
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Donor_Information',
        key: 'DonorID'
      }
    }
  }, {
    sequelize,
    tableName: 'Joined_Donor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EventID" },
          { name: "DonorID" },
        ]
      },
      {
        name: "FK_Joined_Donor_Donor_Information",
        using: "BTREE",
        fields: [
          { name: "DonorID" },
        ]
      },
    ]
  });
};
