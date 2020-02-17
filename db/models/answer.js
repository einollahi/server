const Sequelize = require('sequelize');

let Answer;

const initialize = seq => {
  Answer = seq.define('answer', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      answer: {
        type: Sequelize.JSON,
        allowNull: false
      }
    },
    {
      tableName: 'answers'
    });
};

const defineRelations = () => {
  const Question = require('./question');
  const Patient = require('./patient');
  const User = require('./user');

  Answer.belongsTo(Question.model(), {foreignKey: 'question_id'});
  Answer.belongsTo(Patient.model(), {foreignKey: 'patient_id'});
  Answer.belongsTo(User.model(), {foreignKey: 'doctor_id'});
};

module.exports = {
  initialize,
  model: () => Answer,
  defineRelations
};
