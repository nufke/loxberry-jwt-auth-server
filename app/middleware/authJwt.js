const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../models");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized access. Access Token expired." });
  }
  return res.sendStatus(401).send({ message: "Unauthorized access." });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Unauthorized access. No access token provided." });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isOwner = async (req, res, next) => {
  let user = await db.get('user').find({ id: req.userId }).value();

  for (let i = 0; i < user.roles.length; i++) {
    if (user.roles[i] === "owner") {
      next();
      return;
    }
  }

  res.status(403).send({
    message: "Authentication failed. Requires 'Owner' role."
  });
};

const isFamily = async (req, res, next) => {
  let user = await db.get('user').find({ id: req.userId }).value();

  for (let i = 0; i < user.roles.length; i++) {
    if (user.roles[i] === "family") {
      next();
      return;
    }
  }

  res.status(403).send({
    message: "Authentication failed. Requires 'Family' role."
  });
};

const isFamilyOrOwner = async (req, res, next) => {
  let user = await db.get('user').find({ id: req.userId }).value();

  for (let i = 0; i < roles.length; i++) {
    if (user.roles[i] === "family") {
      next();
      return;
    }

    if (user.roles[i] === "owner") {
      next();
      return;
    }
  }

  res.status(403).send({
    message: "Authentication failed.  Requires 'Family' or 'Owner' role."
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isOwner: isOwner,
  isFamily: isFamily,
  isFamilyOrOwner: isFamilyOrOwner
};

module.exports = authJwt;
