const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized access. Error code 10." });
  }

  return res.sendStatus(401).send({ message: "Unauthorized access. Error code 11." });
}

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Unauthorized access. Error code 12." });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isOwner = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "owner") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Authentication failed. Error code 30."
      });
      return;
    });
  });
};

const isFamily = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "family") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Authentication failed. Error code 31."
      });
    });
  });
};

const isFamilyOrOwner = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "family") {
          next();
          return;
        }

        if (roles[i].name === "owner") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Authentication failed. Error code 32."
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isOwner: isOwner,
  isFamily: isFamily,
  isFamilyOrOwner: isFamilyOrOwner
};
module.exports = authJwt;
