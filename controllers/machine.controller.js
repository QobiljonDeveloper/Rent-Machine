const { Op } = require("sequelize");
const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Region = require("../models/region.model");
const Machine = require("../models/machine.model");
const Category = require("../models/category.model");
const User = require("../models/users.model");
const Contract = require("../models/contract.model");
const Images = require("../models/images.model");
const addMachine = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    } = req.body;

    const region = await Region.findByPk(regionId);
    if (!region) {
      return sendErrorResponse({ message: "Bunday Region mavjud emas" }, res);
    }
    const district = await District.findByPk(districtId);
    if (!district) {
      return sendErrorResponse({ message: "Bunday District mavjud emas" }, res);
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return sendErrorResponse({ message: "Bunday Category mavjud emas" }, res);
    }
    const owner = await User.findByPk(userId);
    if (!owner) {
      return sendErrorResponse({ message: "Bunday Owner mavjud emas" }, res);
    }

    const newMachine = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      categoryId,
      userId,
      regionId,
      districtId,
      min_hour,
      min_price,
    });

    res.status(201).send({ message: "Mashina yaratildi", newMachine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.findAll({
      include: [
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
        {
          model: Images,
          attributes: ["image_url"],
        },
      ],
      attributes: [
        "id",
        "name",
        "price_per_hour",
        "description",
        "is_available",
        "min_hour",
        "min_price",
      ],
    });
    res.status(200).send(machines);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);
    res.status(200).send(machine);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).send({ message: "Bunday mashina mavjud emas" });
    }
    machine.name = name;
    await machine.save();
    res.status(200).send({ message: "Mashina yangilandi", machine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).send({ message: "Bunday mashina mavjud emas" });
    }
    await machine.destroy();
    res.status(200).send({ message: "Mashina o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getMachinesByRegionAndDistrict = async (req, res) => {
  try {
    const { name, region_name, start_time, end_time } = req.body;

    if (!region_name || !name || !start_time || !end_time) {
      return res.status(400).json({
        message:
          "region_name, district_name, start_time, end_time are required",
      });
    }

    const machines = await Machine.findAll({
      include: [
        {
          model: Region,
          where: { name: { [Op.iLike]: `%${region_name}%` } },
        },
        {
          model: District,
          where: { name: { [Op.iLike]: `%${name}%` } },
        },
        {
          model: Contract,
          where: {
            start_time: { [Op.lte]: end_time },
            end_time: { [Op.gte]: start_time },
          },
        },
      ],
    });

    res.status(200).send({ machines });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getMachinesWithImg = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  addMachine,
  getAllMachines,
  getById,
  updateMachine,
  deleteMachine,
  getMachinesByRegionAndDistrict,
};
