module.exports = (sequelize, DataTypes) => sequelize.define(
  'station', {
    stopId: {
      type: DataTypes.CHAR,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR,
    },
    enterFare: {
      type: DataTypes.DECIMAL,
    },
    closedStatus: {
      type: DataTypes.BOOLEAN,
    },
    isTrain: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false,
    freezeTableName: true
  }
);