const User = require("../models/user");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/default.json");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { email, username, password } = userInput;
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ msg: "Email is not valid" });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      errors.push({ msg: "Password too short" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 404;
      throw error;
    }
    let user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      const error = new Error("User already exists.");
      error.data = [{ msg: "Email or username already exists" }];
      error.code = 422;
      throw error;
    }
    user = new User({ email, username, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return { email, username };
  },
  login: async function ({ email, password }) {
    let user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found.");
      error.code = 401;
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Password is incorrect.");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: "3600h",
    });
    return { token: token, email: email };
  },
  createMessage: async function ({ msgInput }, req) {
    if (!req.isAuth) {
      const error = new Error("No token, auth denied");
      error.code = 401;
      throw error;
    }
    const { title, content } = msgInput;
    const errors = [];
    if (validator.isEmpty(title) || !validator.isLength(title, { min: 5 })) {
      errors.push({ msg: "Title too short." });
    }
    if (
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 5 })
    ) {
      errors.push({ msg: "Content too short." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.code = 404;
      error.data = errors;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Invalid user.");
      error.code = 401;
      throw error;
    }
    let message = new Message({
      title: title,
      content: content,
      creator: user,
    });
    await message.save();
    user.messages.push(message);
    await user.save();
    return {...message._doc , createdAt: message.createdAt.toISOString()};
  },
  getMessages: async function (args, req) {
    const messages = Message.find().populate("creator").sort({ createdAt: -1 });
    const total = Message.find().count();
    return { messages: messages, total: total };
  },
  getUserMessages: async function (args, req) {
    if (!req.isAuth) {
      const error = new Error("No token, auth denied");
      error.code = 401;
      throw error;
    }
    const messages = await Message.find({creator:req.userId}).populate("creator");
    if (messages) {
      const total = messages.length;
      return { messages: messages, total: total };
    } else {
      return "No messages yet!";
    }
  },
};
