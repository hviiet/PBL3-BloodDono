const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('affected_location', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'event_information',
        key: 'EventID'
      }
    },
    AffectedWard: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ward_information',
        key: 'Wards_id'
      }
    },
    AffectedDistrict: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'district_information',
        key: 'District_id'
      }
    },
    AffectedProvince: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'province_information',
        key: 'Province_id'
      }
    }
  }, {
    sequelize,
    tableName: 'affected_location',
    timestamps: false,
    indexes: [
      {
        name: "FK_Affected_Location_District_Information",
        using: "BTREE",
        fields: [
          { name: "AffectedDistrict" },
        ]
      },
      {
        name: "FK_Affected_Location_Event_Information",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
      {
        name: "FK_Affected_Location_Province_Information",
        using: "BTREE",
        fields: [
          { name: "AffectedProvince" },
        ]
      },
      {
        name: "FK_Affected_Location_Ward_Information",
        using: "BTREE",
        fields: [
          { name: "AffectedWard" },
        ]
      },
    ]
  });
};
