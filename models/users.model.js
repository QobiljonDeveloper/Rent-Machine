const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      validate: {
        is: /^\d{2}-\d{3}-\d{2}-\d{2}$/,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hashed_password: {
      type: DataTypes.STRING,
    },
    hashed_token: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },       
  {
    freezeTableName: true,
  }
);

module.exports = User;
