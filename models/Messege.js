const Sequelize = require("sequelize");
const db = require("../config/db");

const Message = db.define(
  "message",
  {
    message_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isFav: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    phone: {
      type: Sequelize.INTEGER,
    }
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);
module.exports = Message;