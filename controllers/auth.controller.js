const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtService } = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (!user) {
      return sendErrorResponse({ message: "Email yoki parol noto'g'ri" }, res);
    }
    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!verifiedPassword) {
      return sendErrorResponse({ message: "Email yoki parol noto'g'ri" }, res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = jwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.accessToken, 7);

    user.hashed_token = hashed_token;
    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
      httpOnly: true,
    });

    res
      .status(200)
      .send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse({ message: "Refresh token mavjud emas" }, res);
    }

    let decodedToken;
    decodedToken = jwtService.verifyRefreshToken(refreshToken);

    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return sendErrorResponse({ message: "User mavjud emas" }, res);
    }

    user.hashed_token = null;
    await user.save();

    res.clearCookie("refreshToken");
    res.status(200).send({ message: "User logged out", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return sendErrorResponse({ message: "Refresh token mavjud emas" }, res);
    }

    // Tokenni tekshirib va decode qilish
    let decoded;
    try {
      decoded = jwtService.verifyRefreshToken(refreshToken);
    } catch (err) {
      return sendErrorResponse({ message: "Yaroqsiz refresh token" }, res);
    }

      const user = await User.findByPk(decoded.id, {
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    if (!user) {
      return sendErrorResponse({ message: "User mavjud emas" }, res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = jwtService.generateTokens(payload);
    const hashed_token = await bcrypt.hash(tokens.accessToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};


module.exports = {
  login,
  logout,
  refreshToken,
};
