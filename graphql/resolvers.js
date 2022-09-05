const User = require("../models/user");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const validator = require("validator");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { email, username, password } = userInput;
    const errors = []
    if (!validator.isEmail(email)) {
      errors.push({msg: "Email is not valid"})
    }
    if (validator.isEmpty(password) || !validator.isLength(password, {min: 6})) {
      errors.push({msg: "Password too short"})
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.")
      error.data = errors 
      error.code = 422
      throw error
    }
    let user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      const error = new Error("User already exists.")
      error.data = [{msg: "Email or username already exists"}] 
      error.code = 422
      throw error
    }
    user = new User({email, username, password})
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    return {email, username}
  },
  getUser() {
    return {
      email: "ok",
      username: "123",
    };
  },
};
