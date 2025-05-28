const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category.model");
const Region = require("./region.model");
const District = require("./district.model");
const User = require("./users.model");

const Machine = sequelize.define(
  "machine",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    min_hour: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    min_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    createdAt: true,
    updatedAt: false,
  }
);

Category.hasMany(Machine);
Machine.belongsTo(Category);

Region.hasMany(Machine);
Machine.belongsTo(Region);

District.hasMany(Machine);
Machine.belongsTo(District);

User.hasMany(Machine);
Machine.belongsTo(User);

module.exports = Machine;
