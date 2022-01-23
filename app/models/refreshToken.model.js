const config = require("../config");
const { v4: uuidv4 } = require("uuid");

module.exports = (db) => {

  createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
    let _token = uuidv4();

    await db.get('refreshToken').push({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    }).write();
    
    return _token;
  };

  verifyExpiration = (token) => {
    return (token.expiryDate < new Date().getTime());
  };

  const refreshTokenModel = {
    createToken: createToken,
    verifyExpiration: verifyExpiration
  };

  return refreshTokenModel;
};
