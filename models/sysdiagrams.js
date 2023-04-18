const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sysdiagrams', {
    name: {
      type: DataTypes.STRING(160),
      allowNull: false
    },
    principal_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    diagram_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    definition: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sysdiagrams',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "diagram_id" },
        ]
      },
      {
        name: "UK_principal_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "principal_id" },
          { name: "name" },
        ]
      },
    ]
  });
};
