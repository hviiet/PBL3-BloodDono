const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('district_information', {
    District_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Province_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Name: {
      type: DataTypes.CHAR(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'district_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "District_id" },
        ]
      },
    ]
  });
};
