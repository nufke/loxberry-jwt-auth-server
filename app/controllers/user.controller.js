const config = require("../config");
const fetch = require('node-fetch');

exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Public Content."});
};

exports.guestBoard = (req, res) => {
  res.status(200).send({ message: "Guest Content."});
};

exports.familyBoard = (req, res) => {
  res.status(200).send({ message: "Family Content."});
};

exports.ownerBoard = (req, res) => {
  res.status(200).send({ message: "Owner Content."});
};

exports.mqttBoard = (req, res) => {
  fetch(config.RPCUrl, {
    method: 'POST',
    body: JSON.stringify(config.MQTTConnectionDetails),
    headers: { 'Content-Type': 'application/json' }
  }).then( async (response) => { 
    const data = await response.json();
    res.status(200).send(data);
  })  
  .then(json => { console.log(json)})
  .catch(err => console.log(err));
};
