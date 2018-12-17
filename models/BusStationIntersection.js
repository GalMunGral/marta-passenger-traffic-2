module.exports = (sequelize, DataTypes) => sequelize.define(
  'bus_station_intersection', {
    stopId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    intersection: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  }
);
