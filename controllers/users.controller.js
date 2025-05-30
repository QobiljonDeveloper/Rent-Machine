const { sendErrorResponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model");
const Review = require("../models/review.model");
const Role = require("../models/roles.model");
const UserAddress = require("../models/user.address");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Bunday foydalanuvchi mavjud" }, res);
    }
    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas" }, res);
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });

    res.status(201).send({ message: "Yangi foydalanuvchi qo'shildi", newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserAddress,
          attributes: ["name", "address"],
        },
        {
          model: Role,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Machine,
          attributes: {
            exclude: ["categoryId", "regionId", "districtId", "userId"],
          },
        },
        {
          model: Review,
          attributes: ["rating", "comment"],
          include: [
            {
              model: Machine,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.status(200).send({ message: "Barcha Userlar", users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
