const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('joined_donor', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'event_information',
        key: 'EventID'
      }
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'donor_information',
        key: 'DonorID'
      }
    }
  }, {
    sequelize,
    tableName: 'joined_donor',
    timestamps: false,
    indexes: [
      {
        name: "FK_Joined_Donor_Event_Information",
        using: "BTREE",
        fields: [
          { name: "EventID" },
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
