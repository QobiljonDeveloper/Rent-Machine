const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Comission = sequelize.define(
  "comission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    percent: {
      type: DataTypes.DECIMAL(10, 2),
    },
    
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Comission;
