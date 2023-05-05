const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Medical_History', {
    RecordID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Donor_Information',
        key: 'DonorID'
      }
    },
    IllnessID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'Illness_Reference',
        key: 'IllnessID'
      }
    }
  }, {
    sequelize,
    tableName: 'Medical_History',
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
        name: "RecordID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RecordID" },
        ]
      },
      {
        name: "FK_Medical_History_Donor_Information",
        using: "BTREE",
        fields: [
          { name: "DonorID" },
        ]
      },
      {
        name: "FK_Medical_History_Illness_Reference",
        using: "BTREE",
        fields: [
          { name: "IllnessID" },
        ]
      },
    ]
  });
};
