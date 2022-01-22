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
