module.exports = (sequelize, DataTypes) => sequelize.define(
  'user', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    freezeTableName: true,
  }
);