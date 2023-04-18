const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('illness_reference', {
    IllnessID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    IllnessName: {
      type: DataTypes.CHAR(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'illness_reference',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IllnessID" },
        ]
      },
    ]
  });
};
