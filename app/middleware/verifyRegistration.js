const db = require("../models");

checkDuplicateUsername = async (req, res, next) => {
  let user = await db.get('user').find({username: req.body.username}).value();
  if (user) {
    res.status(400).send({
      message: "Registration failed. Username already exists."
    });
    return;
  }
  next();
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!db.get('roles').includes(req.body.roles[i])) {
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
