const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator')
const User = require('../models/user');

module.exports = {
  createUser: async function({ userInput }, res) {

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      phone: userInput.phone,
      password: hashedPw
    });
    const createdUser = await user.save();
    return createdUser;
  },
  getStatus(req,res) {

  },
};
