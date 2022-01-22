module.exports = {
  secret: "8A34EF6AD491F9E52A09A5B1" || process.env.secret,
  salt: '$2a$12$tWNQPbd5vu3XrqvtOpbIr.FHxD.LqPTOzk5qEN3X2j2yTVHt2JKt6' || process.env.salt,
  PORT: 3030 || process.env.PORT, // Authentication server port
  jwtExpiration: 60,              // test: 60 (1min), default: 3600 (1h) 
  jwtRefreshExpiration: 300       // 5 minutes, default: 86400 (24h)
};
