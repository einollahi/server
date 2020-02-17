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
      first_seen: {
        type: Sequelize.BOOLEAN
      },
      registered_by: {
        type: Sequelize.STRING,
        allowNull: false
      },
      register_date: {
        type: Sequelize.DATE
      },
      active_questionnaire: {
        type: Sequelize.JSON
      }
      ,
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
  const Answer = require('./answer');
  const Patient = require('./patient');
  const Question = require('./question');
  const Questionnaire = require('./questionnaire');

  User.belongsTo(Person.model(), {foreignKey: 'person_id'});
  User.hasMany(Answer.model(), {foreignKey: 'doctor_id'});
  User.hasMany(Patient.model(), {foreignKey:'created_by'});
  User.hasMany(Question.model(), {foreignKey:'created_by'});
  User.hasMany(Questionnaire.model(), {foreignKey:'created_by'});
};

module.exports = {
  initialize,
  model: () => User,
  defineRelations
};
