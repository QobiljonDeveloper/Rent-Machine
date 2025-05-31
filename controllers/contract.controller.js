const { QueryTypes, Op } = require("sequelize");
const sequelize = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");
const Comission = require("../models/comission.model");
const Contract = require("../models/contract.model");
const Machine = require("../models/machine.model");
const Status = require("../models/status.model");
const User = require("../models/users.model");

const addContract = async (req, res) => {
  try {
    const {
      total_price,
      date,
      machineId,
      userId,
      statusId,
      comissionId,
      start_time,
      end_time,
    } = req.body;

    const startTime = new Date(start_time);
    const endTime = new Date(end_time);

    const total_time = Math.floor((endTime - startTime) / 60000);
    const newContract = await Contract.create({
      total_price,
      date,
      machineId,
      userId,
      statusId,
      comissionId,
      start_time,
      end_time,
      total_time,
    });

    res.status(201).send({ message: "Contract yaratildi", newContract });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllContract = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "min_hour", "min_price"],
        },
        { model: User, attributes: ["full_name", "phone"] },
        { model: Status, attributes: ["name"] },
        { model: Comission, attributes: ["percent"] },
      ],
    });
    res.status(200).send(contracts);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

// contractni id bo'yicha olish
const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOne({
      where: { id },
      include: [
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "min_hour", "min_price"],
        },
        { model: User, attributes: ["full_name", "phone"] },
        { model: Status, attributes: ["name"] },
        { model: Comission, attributes: ["percent"] },
      ],
    });

    if (!contract) {
      return res.status(404).send({ message: "Contract topilmadi" });
    }

    res.status(200).send(contract);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      total_price,
      date,
      machineId,
      userId,
      statusId,
      comissionId,
      start_time,
      end_time,
    } = req.body;

    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ message: "Contract topilmadi" });
    }

    const startTime = start_time
      ? new Date(start_time)
      : new Date(contract.start_time);
    const endTime = end_time ? new Date(end_time) : new Date(contract.end_time);
    const total_time = Math.floor((endTime - startTime) / 60000);

    contract.total_price = total_price ?? contract.total_price;
    contract.date = date ?? contract.date;
    contract.machineId = machineId ?? contract.machineId;
    contract.userId = userId ?? contract.userId;
    contract.statusId = statusId ?? contract.statusId;
    contract.comissionId = comissionId ?? contract.comissionId;
    contract.start_time = start_time ?? contract.start_time;
    contract.end_time = end_time ?? contract.end_time;
    contract.total_time = total_time;

    await contract.save();

    res.status(200).send({ message: "Contract yangilandi", contract });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ message: "Contract topilmadi" });
    }
    await contract.destroy();
    res.status(200).send({ message: "Contract o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getContractUserMachines = async (req, res) => {
  try {
    const { full_name, start_time, end_time, name } = req.body;

    const machines = await sequelize.query(
      `
  SELECT m.*
  FROM machine m
  JOIN users u ON u.id = m."userId"
  JOIN contract c ON c."machineId" = m.id
  JOIN category ca ON m."categoryId" = ca.id
  WHERE LOWER(u.full_name) = LOWER(:full_name)
    AND c.start_time <= :end_time
    AND c.end_time >= :start_time
    AND LOWER(ca.name) = LOWER(:name)
  `,
      {
        replacements: { full_name, start_time, end_time, name },
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).send({ machines });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};


const getCancelledContracts = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
      return sendErrorResponse(
        { message: "start Time va end Time kerak." },
        res
      );
    }

    const contracts = await Contract.findAll({
      where: {
        start_time: {
          [Op.between]: [start_time, end_time],
        },
      },
      include: [
        {
          model: Status,
          where: {
            name: "Canceled",
          },
          attributes: ["id", "name"],
        },
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "min_hour", "min_price"],
        },
        {
          model: User,
          attributes: ["full_name", "phone"],
        },

      ],
    });

    res.status(200).send({ contracts });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addContract,
  getAllContract,
  getContractById,
  updateContract,
  deleteContract,
  getContractUserMachines,
  getCancelledContracts,
};
