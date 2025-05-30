const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accsesKey, refreshKey, accsesTime, refreshTime) {
    this.accsesKey = accsesKey;
    this.refreshKey = refreshKey;
    this.accsesTime = accsesTime;
    this.refreshTime = refreshTime;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accsesKey, {
      expiresIn: this.accsesTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  verifyAccessToken(token) {
    return jwt.verify(token, this.accsesKey);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

const jwtService = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

module.exports = {
  jwtService,
};
