const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/users.model");

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const position = await Role.findOne({
      where: { name: name.toLowerCase() },
    });

    if (position) {
      return sendErrorResponse({ message: "Bunday Role mavjud" }, res);
    }

    const newRole = await Role.create({
      name: name.toLowerCase(),
      description,
    });

    res.status(201).send({ message: "Role yaratildi", newRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["name"],
    });
    res.status(200).send({ message: "Rolelar ro'yxat", roles });
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
  addRole,
  getAllRoles,
  getById,
  updateRegion,
  deleteRegion,
};
