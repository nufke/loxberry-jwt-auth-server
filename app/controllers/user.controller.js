exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.guestBoard = (req, res) => {
  res.status(200).send("Guest Content.");
};

exports.familyBoard = (req, res) => {
  res.status(200).send("Family Content.");
};

exports.ownerBoard = (req, res) => {
  res.status(200).send("Owner Content.");
};
