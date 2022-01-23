const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./app/config");

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// public route to server root
app.get("/", cors(corsOptions), (req, res) => {
  res.json({ message: "Loxberry Authentication Server." });
});

// other routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// listen for requests
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});

