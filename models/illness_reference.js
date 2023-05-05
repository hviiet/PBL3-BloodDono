const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Illness_Reference', {
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
    tableName: 'Illness_Reference',
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
