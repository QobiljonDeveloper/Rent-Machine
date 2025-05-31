const { sendErrorResponse } = require("../../helpers/send_error_response");
const UserAddress = require("../../models/user.address");

module.exports = async (req, res, next) => {
  try {
    const addressId = req.params.id;
    const userId = req.user.id;

    const address = await UserAddress.findByPk(addressId);

    if (!address) {
      return res.status(404).send({
        message: "Manzil topilmadi",
      });
    }

    if (String(address.userId) !== String(userId)) {
      return res.status(403).send({
        message:
          "Ruxsat etilmagan foydalanuvchi. Faqat o'z ma'lumotini o'zgartirish yoki o'chirishi mumkin",
      });
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
