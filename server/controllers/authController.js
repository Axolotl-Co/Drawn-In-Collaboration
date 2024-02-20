const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

// Registration route
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword
    });

    newUser.save()
      .then(() => {
        res.status(200).json({ message: 'Welcome to your canvas!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Error registering new user please try again.' });
      });
  } catch (error) {
    console.error('Error in register function:', error);
  }
};

// Login route
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'The username does not exist' });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          return res.status(500).json({ message: 'Internal error please try again.' });
        } else if (!same) {
          return res.status(401).json({ message: 'Incorrect password.' });
        } else {
          return res.status(200).json({ message: 'User authenticated' });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in, please try again.' });
  }
};

// Get authenticated user
exports.getUser = (req, res) => {
  UserModel.findById(req.user.id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user, please try again.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return res.status(200).json(userWithoutPassword);
    }
  });
};