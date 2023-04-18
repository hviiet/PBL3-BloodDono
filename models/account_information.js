const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_information', {
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
    tableName: 'account_information',
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
