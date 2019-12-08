const Sequelize = require('sequelize');

const sequelize = new Sequelize('urology', 'postgres', '', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    useUTC: false //for reading from database
  },
  timezone: '+03:30'
});

module.exports = sequelize;
