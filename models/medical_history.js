const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medical_history', {
    DonorID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'donor_information',
        key: 'DonorID'
      }
    },
    IllnessID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      references: {
        model: 'illness_reference',
        key: 'IllnessID'
      }
    },
    MedicalHistoryStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'medical_history',
    timestamps: false,
    indexes: [
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
