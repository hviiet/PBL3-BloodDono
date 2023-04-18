const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('image_table', {
    ImageID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    ImageContext: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'image_table',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ImageID" },
        ]
      },
    ]
  });
};
