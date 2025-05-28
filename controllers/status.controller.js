const { sendErrorResponse } = require("../helpers/send_error_response");
const Status = require("../models/status.model");

const addStatus = async (req, res) => {
  try {
    const { name } = req.body;

    const newStatus = await Status.create({ name });

    res.status(201).send({ message: "Status yaratildi", newStatus });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    res.status(200).send(status);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    res.status(200).send(status);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Bunday status mavjud emas" });
    }
    status.name = name;
    await status.save();
    res.status(200).send({ message: "Status yangilandi", status });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Bunday status mavjud emas" });
    }
    await status.destroy();
    res.status(200).send({ message: "Status o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addStatus,
  getAllStatus,
  getById,
  updateStatus,
  deleteStatus,
};
