const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAddress = require("../models/user.address");
const User = require("../models/users.model");

const addUserAddress = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorResponse({ message: "Bunday user mavjud emas" }, res);
    }

    const newUserAddress = await UserAddress.create({
      name,
      address,
      userId,
    });

    res.status(201).send({
      message: "Foydalanuvchiga yangi manzil qo'shildi",
      newUserAddress,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findAll({
      // include: User
      include: [
        // Bu esa bo'glangan tabledan ma'lumotni qisqartirib olish uchun ishlatiladi shunday qilinadi
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],

      attributes: ["name"], // Shu tableni ozidan oladi
    });

    res.status(200).send(userAddress);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getUserAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const userAddress = await UserAddress.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
      attributes: ["name", "address", "userId"],
    });

    if (!userAddress) {
      return sendErrorResponse(
        { message: "Bunday manzil topilmadi" },
        res,
        404
      );
    }

    res.status(200).send(userAddress);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const userAddress = await UserAddress.findByPk(id);

    if (!userAddress) {
      return sendErrorResponse(
        { message: "Bunday manzil topilmadi" },
        res,
        404
      );
    }

    userAddress.name = name ?? userAddress.name;
    userAddress.address = address ?? userAddress.address;

    await userAddress.save();

    res.status(200).send({
      message: "Manzil muvaffaqiyatli yangilandi",
      userAddress,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const userAddress = await UserAddress.findByPk(id);

    if (!userAddress) {
      return sendErrorResponse(
        { message: "Bunday manzil topilmadi" },
        res,
        404
      );
    }

    await userAddress.destroy();

    res.status(200).send({ message: "Manzil muvaffaqiyatli o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUserAddress,
  getAllUserAddress,
  getUserAddressById,
  updateUserAddress,
  deleteUserAddress,
};
