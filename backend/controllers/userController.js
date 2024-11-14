const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { mobileNo, password } = req.body;

  try {
    const userExists = await User.findOne({ mobileNo });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ mobileNo, password });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const loginUser = async (req, res) => {
  const { mobileNo, password } = req.body;

  try {
    const user = await User.findOne({ mobileNo });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      token,
      message: 'LoggedIn',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser };
