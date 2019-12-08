const Sequelize = require('sequelize');

let User;

const initialize = seq => {
  User = seq.define(
    'user',
    {
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
      },
      registered_by: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_seen: {
        type: Sequelize.BOOLEAN
      },
      register_date: {
        type: Sequelize.DATE
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    },
    {
      tableName: 'users'
    }
  );
};

const defineRelations = () => {
  const Person = require('./person');
  const Questionnaire = require('./questionnaire');
  const Question = require('./question');

  User.belongsTo(Person.model(), {foreignKey: {allowNull: true}, onDelete: 'RESTRICT'});
  User.hasMany(Questionnaire.model(), {foreignKey: {allowNull: true}});
  User.hasMany(Question.model(), {foreignKey: {allowNull: true}});
};

module.exports = {
  initialize,
  model: () => User,
  defineRelations
};
