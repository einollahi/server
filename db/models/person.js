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
  avatar_url: {
    type: Sequelize.STRING
  },
  national_code: {
    type: Sequelize.STRING
  },
  birth_date: {
    type: Sequelize.DATE
  },
  mobile: {
    type: Sequelize.JSON
  },
  phone: {
    type: Sequelize.JSON
  },
  data_json: {
    type: Sequelize.JSON
  }
});

module.exports = Person;
