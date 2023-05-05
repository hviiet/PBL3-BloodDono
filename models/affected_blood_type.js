const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Affected_Blood_Type', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Event_Information',
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
    tableName: 'Affected_Blood_Type',
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
