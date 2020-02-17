const sequelize = require('../utils/db');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const Person = require('./models/person');
const User = require('./models/user');
const Questionnaire = require('./models/questionnaire');
const Question = require('./models/question');
const Answer = require('./models/answer');
const Patient = require('./models/patient');
const Session = require('./models/session');

tablesList = [Session, Person, User, Questionnaire, Question, Answer, Patient];

// initializing database
tablesList.forEach(model => {
  if (model.model) {
    model.initialize(sequelize);
  }
});
// defining relations between tables
tablesList.forEach(model => {
  if (model.model) {
    model.defineRelations();
  }
});

sequelize.sync({force: false}).then(() => {
});

module.exports = {
  sequelize,
  Op,
  User: sequelize.models['user'],
  Person: sequelize.models['person'],
  Questionnaire: sequelize.models['questionnaire'],
  Question: sequelize.models['question'],
  Answer: sequelize.models['answer'],
  Patient: sequelize.models['patient'],
};
