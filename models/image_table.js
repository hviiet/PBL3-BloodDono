const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Image_Table', {
    ImageID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    ImagePath: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Image_Table',
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
