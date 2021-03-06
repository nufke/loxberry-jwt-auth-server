module.exports = {
  secret: "8a34ef6ad491f9e52a09a5b1c8be12f5" || process.env.secret, // to create JWT token
  salt: '$2a$12$tWNQPbd5vu3XrqvtOpbIr.FHxD.LqPTOzk5qEN3X2j2yTVHt2JKt6' || process.env.salt, // to store credentials in database
  lowDbFile: '/path/to/database/lowdb.json' || process.env.lowDbFile, // JSON database file location
  PORT: 3030 || process.env.PORT,                                     // Authentication server port
  jwtExpiration: 3600 || process.env.jwtExpiration,                   // test: 60 (1min), default: 3600 (1h) 
  jwtRefreshExpiration: 86400 || process.env.jwtRefreshExpiration,    // 5 minutes, default: 86400 (24h)
  RPCUrl: 'http://localhost:80/admin/system/jsonrpc.php' || process.env.RPCUrl, // JSON-RPC Url
  MQTTConnectionDetails: {"id":1,"jsonrpc":"2.0","method":"mqtt_connectiondetails","params":[]} || process.env.MQTTConnectionDetails
};
