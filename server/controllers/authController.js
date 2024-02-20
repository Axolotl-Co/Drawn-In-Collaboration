const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

// Registration route
exports.register = async (req, res) => {
  console.log('Register function called'); // Log when the function is called

  const { username, password } = req.body;
  console.log(`Username: ${username}`); // Log the username

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed'); // Log when the password is hashed

    const newUser = new UserModel({
      username,
      password: hashedPassword
    });

    // Save the user and handle the result with Promises
    newUser.save()
      .then(() => {
        console.log('User saved successfully'); // Log when the user is saved successfully
        res.status(200).send('Welcome to your canvas!');
      })
      .catch(err => {
        console.log('Error saving user:', err); // Log any errors when saving the user
        res.status(500).send('Error registering new user please try again.');
      });
  } catch (error) {
    console.log('Error in register function:', error); // Log any errors in the function
  }
};

///Login route
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await UserModel.findOne({ username });

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
  } catch (err) {
    return res.status(500).send('Error logging in, please try again.');
  }
};

  // Get authenticated user
  exports.getUser = (req, res) => {
    UserModel.findById(req.user.id, (err, user) => {
      if (err) {
        return res.status(500).send('Error retrieving user, please try again.');
      }
      if (!user) {
        return res.status(404).send('User not found');
      } else {
        // Don't send the password back to the client
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        return res.status(200).json(userWithoutPassword);
      }
    });
  };