const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    FeedbackID: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    FeedbackText: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Feedback',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "FeedbackID" },
        ]
      },
    ]
  });
};
