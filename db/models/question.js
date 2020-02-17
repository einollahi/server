const Sequelize = require('sequelize');

let Question;

const initialize = seq => {
  Question = seq.define('question', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      question_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      options: {
        type: Sequelize.JSON
      },
      multi_answer:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      position: {
        type: Sequelize.INTEGER
      },
    },
    {
      tableName: 'questions'
    });
};

const defineRelations = () => {
  const User = require('./user');
  const Questionnaire = require('./questionnaire');
  const Answer = require('./answer');

  Question.belongsTo(User.model(), {foreignKey: 'created_by'});
  Question.belongsTo(Questionnaire.model(), {foreignKey: 'questionnaire_id'});
  Question.hasMany(Answer.model(), {foreignKey: 'question_id'});
};

module.exports = {
  initialize,
  model: () => Question,
  defineRelations
};
