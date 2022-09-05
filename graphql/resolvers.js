const User = require("../models/user");
const Message = require("../models/message");
const bcrypt = require("bcryptjs")
module.exports = {
  createUser: async function ({ userInput }, req) {
    const { email, username, password } = userInput;
    let user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      return res.status(400).json([{msg: "Username Or Email Already exists"}])
    }
    user = new User({email, username, password})
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    return { email, username }
  },
  getUser() {
    return {
      email: "ok",
      username: "123",
    };
  },
};
