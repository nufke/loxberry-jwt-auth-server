const db = require("../models");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let userId = 1;

exports.register = (req, res) => {
  db.get('user').push({
    id: userId,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, config.salt),
    roles: req.body.roles
  }).write();
  userId++;
  res.send({ message: "User '" + req.body.username + "' registered successfully!" });
};

exports.login = async (req, res) => {
  let user = await db.get('user').find({ username: req.body.username }).value();

  if (!user) {
    return res.status(404).send({ message: "Authorization failed. User not found." });
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Authorization failed. Invalid password."
    });
  }

  const accessToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.jwtExpiration
  });

  const refreshToken = await db.refreshToken.createToken(user);

  let authorities = [];
  for (let i = 0; i < user.roles.length; i++) {
    authorities.push("ROLE_" + user.roles[i].toUpperCase());
  }

  res.status(200).send({
    username: user.username,
    roles: authorities,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
};

exports.refresh = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(401).json({ message: "Authentication failed. Refresh token required." });
  }

  try {
    let refreshToken = await db.get('refreshToken').find({ token: requestToken }).value();

    if (!refreshToken) {
      res.status(403).json({ message: "Authentication failed. Refresh token not recognized. Login again." });
      return;
    }

    if (db.refreshToken.verifyExpiration(refreshToken)) {
      await db.get('refreshToken').remove({ token: refreshToken.token } ).write();
      res.status(403).json({
        message: "Authentication failed. Refresh token expired. Login again."
      });
      return;
    }

    let userId = await refreshToken.userId;
    let user = await db.get('user').find({ id: userId }).value();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Logout failed. Refresh token required." });
  }

  try {
    let refreshToken = await db.get('refreshToken').find({ token: requestToken }).value();

    if (!refreshToken) {
      res.status(403).json({ message: "Logout failed. Refresh token not recognized." });
      return;
    }

    let userId = await refreshToken.userId;
    let user = await db.get('user').find({ id: userId }).value();

    await db.get('refreshToken').remove({ token: refreshToken.token } ).write();
   
    res.send({
      message: "Logout user " + user.username + " completed."
    });
    return;

  } catch (err) {
    return res.status(500).send({ error: err });
  }
};
