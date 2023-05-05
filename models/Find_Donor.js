const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Find_Donor', {
    RecordID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    SenderName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SenderPicture: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    InNeedName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    InNeedPicture: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    InNeedBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    InNeedBloodType: {
      type: DataTypes.CHAR(3),
      allowNull: false
    },
    GivingAddress: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Address',
        key: 'AddressID'
      }
    },
    Note: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Find_Donor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RecordID" },
        ]
      },
      {
        name: "GivingAddress",
        using: "BTREE",
        fields: [
          { name: "GivingAddress" },
        ]
      },
    ]
  });
};
