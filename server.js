const express = require("express");
const cors = require("cors");
const app = express();
var dbConf = require('./app/config/db.config');
var authConf = require('./app/config/auth.config');

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

// database
const db = require("./app/models");
const Role = db.role;

if (dbConf.syncAtStartup) {
  db.sequelize.sync().then( () => {
    console.log('Sync database at startup');
  });
}

if (dbConf.dropAndResync) {
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync database');
    initial();
  });
}

// public route to server root
app.get("/", cors(corsOptions), (req, res) => {
  res.json({ message: "Loxberry Authentication Server." });
});

// other routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// listen for requests
app.listen(authConf.PORT, () => {
  console.log(`Server is running on port ${authConf.PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "guest"
  });
 
  Role.create({
    id: 2,
    name: "family"
  });
 
  Role.create({
    id: 3,
    name: "owner"
  });
}
