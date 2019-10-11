const Sequelize = require('sequelize');

const {sequelize} = require('../index');

const Person = require('./person');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
});

User.belongsTo(Person, {constraints: true, onDelete: 'CASCADE'});

module.exports = User;
