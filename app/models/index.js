const config = require("../config");
const lowDb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(config.lowDbFile);
const db = lowDb(adapter)

// Set default data
db.defaults({ 
  user: [],
  role: [
  {
    id: 1,
    name: "guest"
  },
  {
    id: 2,
    name: "family"
  },
  {
    id: 3,
    name: "owner"
  }
  ],
  refreshToken: []
}).write();

db.refreshToken = require("../models/refreshToken.model.js")(db);

module.exports = db;
