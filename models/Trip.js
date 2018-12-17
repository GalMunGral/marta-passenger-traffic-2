module.exports = (sequelize, DataTypes) => sequelize.define(
  'trip', {
    tripFare: {
      type: DataTypes.DECIMAL,
    },
    startTime: {
      type: DataTypes.TIME,
      primaryKey: true
    },
    breezecardNum: {
      type: DataTypes.CHAR,
      primaryKey: true
    },
    startsAt: {
      type: DataTypes.STRING,
    },
    endsAt: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    freezeTableName: true
  }
);