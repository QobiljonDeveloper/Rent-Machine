const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./users.model");

const UserAddress = sequelize.define(
  "UserAddress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(UserAddress);
UserAddress.belongsTo(User);

module.exports = UserAddress;
