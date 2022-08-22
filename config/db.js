const Sequelize = require('sequelize');
const config = require('./config');

const { database, username, password, host, dialect } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

module.exports = sequelize;
