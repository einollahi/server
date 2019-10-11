const Sequelize = require('sequelize');

let connectionString;

const Op = Sequelize.Op;

const sequelize = new Sequelize('postgres', 'postgres', '', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    useUTC: false //for reading from database
  }
});

// sequelize
//   .authenticate()
//   .then()

module.exports = {sequelize, Op};

const User = require('./models/user');
const Person = require('./models/person');
