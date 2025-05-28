const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");

const Images = sequelize.define(
  "images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
    },
  },
  {
    freezeTableName: true,
    createdAt: "uploaded_at",
    updatedAt: false,
  }
);

Machine.hasMany(Images);
Images.belongsTo(Machine);

module.exports = Images;
