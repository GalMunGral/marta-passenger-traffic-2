module.exports = (sequelize, DataTypes) => sequelize.define(
  'passenger', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  }
);