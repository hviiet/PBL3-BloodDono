const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event_information', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    EventName: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    HospitalID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'hospital_information',
        key: 'HospitalID'
      }
    },
    EventTimetag: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    EventStartTime: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    EventEndTime: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    EventVolume: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EventDonationPoint: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      references: {
        model: 'address',
        key: 'AddressID'
      }
    }
  }, {
    sequelize,
    tableName: 'event_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
      {
        name: "FK_Event_Information_Address",
        using: "BTREE",
        fields: [
          { name: "EventDonationPoint" },
        ]
      },
      {
        name: "FK_Event_Information_Hospital_Information",
        using: "BTREE",
        fields: [
          { name: "HospitalID" },
        ]
      },
    ]
  });
};
