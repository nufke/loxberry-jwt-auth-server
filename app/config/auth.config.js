module.exports = {
  secret: "8A34EF6AD491F9E52A09A5B1",
  // jwtExpiration: 3600,         // 1 hour
  // jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  jwtExpiration: 60,             // 1 minute
  jwtRefreshExpiration: 300,     // 5 minutes

  PORT: 3030 || process.env.PORT // Authentication server port
};
