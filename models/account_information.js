const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Account_Information', {
    AccountID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    Role: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Account_Information',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "AccountID" },
        ]
      },
    ]
  });
};
