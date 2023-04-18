const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('province_information', {
    Province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.CHAR(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'province_information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Province_id" },
        ]
      },
    ]
  });
};
