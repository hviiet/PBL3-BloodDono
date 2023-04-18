const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seen_donor', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'event_information',
        key: 'EventID'
      }
    },
    Seen_Donor: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'donor_information',
        key: 'DonorID'
      }
    }
  }, {
    sequelize,
    tableName: 'seen_donor',
    timestamps: false,
    indexes: [
      {
        name: "FK_Seen_Donor_Event_Information",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
      {
        name: "FK_Seen_Donor_Donor_Information",
        using: "BTREE",
        fields: [
          { name: "Seen_Donor" },
        ]
      },
    ]
  });
};
