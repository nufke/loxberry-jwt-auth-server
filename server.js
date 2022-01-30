const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./app/config");

// CORS enabled for all origins
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// public route to server root
app.get("/", (req, res) => {
  res.json({ message: "Loxberry Authentication Server." });
});

// other routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// listen for requests
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});

