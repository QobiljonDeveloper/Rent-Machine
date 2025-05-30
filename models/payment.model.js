const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Contract = require("./contract.model");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM,
      values: ["completed", "falied", "canceled"],
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(8, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Payment.belongsTo(Contract);
Contract.hasMany(Payment);

module.exports = Payment;
