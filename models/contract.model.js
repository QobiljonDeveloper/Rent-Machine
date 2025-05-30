const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./users.model");
const Machine = require("./machine.model");
const Status = require("./status.model");
const Comission = require("./comission.model");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    total_time: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Contract.belongsTo(Machine);
Machine.hasMany(Contract); 

Contract.belongsTo(User); 
User.hasMany(Contract);

Contract.belongsTo(Status);
Status.hasMany(Contract);

Contract.belongsTo(Comission); 
Comission.hasMany(Contract);


module.exports = Contract;
