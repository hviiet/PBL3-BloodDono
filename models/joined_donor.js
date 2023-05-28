const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Joined_Donor', {
    EventID: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      references: {
        model: 'Event_Information',
        key: 'EventID'
      }
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: true,
      references: {
        model: 'Donor_Information',
        key: 'DonorID'
      }
    },
    JoinedID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Joined_Donor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "JoinedID" },
        ]
      },
      {
        name: "FK_Joined_Donor_Donor_Information",
        using: "BTREE",
        fields: [
          { name: "DonorID" },
        ]
      },
      {
        name: "FK_Joined_Donor_Event_Information",
        using: "BTREE",
        fields: [
          { name: "EventID" },
        ]
      },
    ]
  });
};
