const { sendErrorResponse } = require("../helpers/send_error_response");
const Region = require("../models/region.model");

const addRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const newRegion = await Region.create({ name });

    res.status(201).send({ message: "Region yaratildi", newRegion });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.status(200).send(regions);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id);
    res.status(200).send(region);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Bunday region mavjud emas" });
    }
    region.name = name;
    await region.save();
    res.status(200).send({ message: "Region yangilandi", region });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).send({ message: "Bunday region mavjud emas" });
    }
    await region.destroy();
    res.status(200).send({ message: "Region o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addRegion,
  getAllRegions,
  getById,
  updateRegion,
  deleteRegion,
};
