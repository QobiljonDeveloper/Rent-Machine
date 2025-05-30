const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const UserRole = require("../models/user_role.model");
const User = require("../models/users.model");

const addUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId, {
      include: { model: Role, attributes: ["id"] },
    });

    console.log(user);
    if (!user) {
      return sendErrorResponse({ message: "Bunday user mavjud emas" }, res);
    }

    // const isRoleExists = user.roles.some((role) => role.id === roleId);

    const hasRolee = await user.hasRole(roleId);

    if (hasRolee) {
      return sendErrorResponse({ message: "Bu rol allaqachon mavjud" }, res);
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse({ message: "Bunday Role mavjud emas" }, res);
    }
    // const newUserRole = await UserRole.create({
    //   userId,
    //   roleId,
    // });

    const newUserRole = await user.addRole(roleId);
    res
      .status(201)
      .send({ message: "Userga yani Role qo'shildi", newUserRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).send({ message: "Rolelar ro'yxat", userRoles });
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

const deleteUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        attributes: ["id"],
        through: { attributes: [] },
      },
    });

    if (!user) {
      return sendErrorResponse(
        { message: "Bunday foydalanuvchi mavjud emas" },
        res
      );
    }

    const isRoleExists = user.roles.some((role) => role.id === roleId);
    if (!isRoleExists) {
      return sendErrorResponse(
        { message: "Foydalanuvchida bu rol mavjud emas" },
        res
      );
    }

    await user.removeRole(roleId);

    res.status(200).send({ message: "Role foydalanuvchidan olib tashlandi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUserRole,
  getAllUserRoles,
  getById,
  updateRegion,
  deleteUserRole,
};
