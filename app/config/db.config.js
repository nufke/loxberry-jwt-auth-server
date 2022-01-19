module.exports = {
  HOST: ""     || process.env.HOST,     // not applicable for sqlite
  USER: ""     || process.env.USER,     // not applicable for sqlite
  PASSWORD: "" || process.env.PASSWORD, // not applicable for sqlite
  DB: ""       || process.env.DB,       // not applicable for sqlite
  dialect: "sqlite" || process.env.dialect,
  syncAtStartup: true || process.env.syncAtStartup,
  dropAndResync: false || process.env.dropAndResync,
  urlOrPath: '/path/to/database.sqlite' || process.env.urlOrPath,
};
