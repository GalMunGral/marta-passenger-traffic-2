module.exports = (sequelize, DataTypes) => sequelize.define(
  'conflict', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    breezecardNum: {
      type: DataTypes.CHAR,
      primaryKey: true,
    },
    dateTime: {
      type: DataTypes.TIME
    }
  }, {
    timestamps: false,
    freezeTableName: true
  }
);