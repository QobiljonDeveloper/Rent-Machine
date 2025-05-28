const { sendErrorResponse } = require("../helpers/send_error_response");
const Comission = require("../models/comission.model");

const addComission = async (req, res) => {
  try {
    const { percent } = req.body;

    const newComission = await Comission.create({ percent });

    res.status(201).send({ message: "Comission yaratildi", newComission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllComissions = async (req, res) => {
  try {
    const comissions = await Comission.findAll();
    res.status(200).send(comissions);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const comission = await Comission.findByPk(id);
    res.status(200).send(comission);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateComission = async (req, res) => {
  try {
    const { id } = req.params;
    const { percent } = req.body;
    const comission = await Comission.findByPk(id);
    if (!comission) {
      return res.status(404).send({ message: "Bunday comission mavjud emas" });
    }
    comission.percent = percent;
    await comission.save();
    res.status(200).send({ message: "Comission yangilandi", comission });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteComission = async (req, res) => {
  try {
    const { id } = req.params;
    const comission = await Comission.findByPk(id);
    if (!comission) {
      return res.status(404).send({ message: "Bunday comission mavjud emas" });
    }
    await comission.destroy();
    res.status(200).send({ message: "Comission o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addComission,
  getAllComissions,
  getById,
  updateComission,
  deleteComission,
};
