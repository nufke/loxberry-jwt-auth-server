const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

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
        message: "Authentication failed. Requires 'Owner' role."
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
        message: "Authentication failed. Requires 'Family' role."
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
        message: "Authentication failed.  Requires 'Family' or 'Owner' role."
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
