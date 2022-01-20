const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Registration failed. Username already exists."
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Registration failed. Role '"+ req.body.roles[i]+"' does not exist." 
        });
        return;
      }
    }
  }
  
  next();
};

const verifyRegistration = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifyRegistration;
