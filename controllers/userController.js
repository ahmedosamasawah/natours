exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

exports.getOneUser = (req, res) => {
  res.status(200).json({
    status: 'success!',
  });
};

exports.addNewUser = (req, res) => {
  res.status(201).json({
    status: 'user added successfully!',
  });
};

exports.updateUser = (req, res) => {
  res.json({
    status: 'user updated successfully!',
  });
};

exports.deleteOneUser = (req, res) => {
  res.json({
    status: 'user deleted successfully!',
  });
};
