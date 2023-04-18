const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ward_information', {
    Wards_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    District_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Name: {
      type: DataTypes.CHAR(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ward_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Wards_id" },
        ]
      },
    ]
  });
};
