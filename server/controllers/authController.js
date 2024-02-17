const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword
  });

  newUser.save(err => {
    if (err) {
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to your canvas!');
    }
  });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
  
    UserModel.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).send('Error logging in, please try again.');
      }
      if (!user) {
        return res.status(401).send('The username does not exist');
      } else {
        user.isCorrectPassword(password, (err, same) => {
          if (err) {
            return res.status(500).send('Internal error please try again.');
          } else if (!same) {
            return res.status(401).send('Incorrect password.');
          } else {
            // If the password is correct, then create a JWT token
            return res.status(200).send('User authenticated');
          }
        });
      }
    });
  };