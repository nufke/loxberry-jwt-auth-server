const { verifySignUp } = require("../middleware");
const authController = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.register
  );

  app.post("/auth/login", authController.login);

  app.post("/auth/refresh", authController.refresh);
};
