const Sequelize = require('sequelize');

const {sequelize} = require('../index');

const Person = sequelize.define('person', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar_url: {
    type: Sequelize.STRING
  },
  national_code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  medical_number: {
    type: Sequelize.STRING
  },
  speciality: {
    type: Sequelize.STRING
  },
  hospital: {
    type: Sequelize.STRING
  },
  birth_date: {
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.JSON
  },
  address: {
    type: Sequelize.STRING
  }
});

module.exports = Person;
