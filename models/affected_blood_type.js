const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('affected_blood_type', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'event_information',
        key: 'EventID'
      }
    },
    BloodType: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'affected_blood_type',
    timestamps: false,
    indexes: [
      {
        name: "FK_Affected_Blood_Type_Event_Information",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
    ]
  });
};
