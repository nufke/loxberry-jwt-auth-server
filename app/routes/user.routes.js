const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/public", userController.allAccess);

  app.get(
    "/guest",
    [authJwt.verifyToken],
    userController.guestBoard
  );

  app.get(
    "/family",
    [authJwt.verifyToken, authJwt.isFamily],
    userController.familyBoard
  );

  app.get(
    "/owner",
    [authJwt.verifyToken, authJwt.isOwner],
    userController.ownerBoard
  );

};
