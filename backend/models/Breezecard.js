module.exports = (sequelize, DataTypes) => sequelize.define(
  'breezecard', {
    breezecardNum: {
      type: DataTypes.CHAR,
      primaryKey: true,
    },
    value: {
      type: DataTypes.DECIMAL,
    },
    belongsTo: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    freezeTableName: true
  }
);