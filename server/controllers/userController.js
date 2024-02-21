const UserModel = require('../models/UserModel');

// Get user profile
exports.getProfile = (req, res) => {
  UserModel.findById(req.user.id, (err, user) => {
    if (err) {
      return res.status(500).send('Error retrieving user profile.');
    }
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.send(user);
  });
};

// Update user profile
exports.updateProfile = (req, res) => {
  UserModel.findByIdAndUpdate(req.user.id, req.body, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).send('Error updating user profile.');
    }
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.send(user);
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  UserModel.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send('Error deleting user.');
    }
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.send('User deleted.');
  });
};