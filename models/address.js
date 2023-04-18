const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    AddressID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    AddressStreet: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    AddressWard: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ward_information',
        key: 'Wards_id'
      }
    },
    AddressDistrict: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'district_information',
        key: 'District_id'
      }
    },
    AddressProvince: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'province_information',
        key: 'Province_id'
      }
    }
  }, {
    sequelize,
    tableName: 'address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AddressID" },
        ]
      },
      {
        name: "FK_Address_District_Information",
        using: "BTREE",
        fields: [
          { name: "AddressDistrict" },
        ]
      },
      {
        name: "FK_Address_Province_Information",
        using: "BTREE",
        fields: [
          { name: "AddressProvince" },
        ]
      },
      {
        name: "FK_Address_Ward_Information",
        using: "BTREE",
        fields: [
          { name: "AddressWard" },
        ]
      },
    ]
  });
};
