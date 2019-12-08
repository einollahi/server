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
      position: {
        type: Sequelize.INTEGER
      },
    },
    {
      tableName: 'questions'
    });
};

const defineRelations = () => {
  const User = require('./user')
  const Questionnaire = require('./questionnaire')
  const Answer = require('./answer')

  Question.belongsTo(User.model(), {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
  Question.belongsTo(Questionnaire.model(), {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
  Question.hasMany(Answer.model(), {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
};

module.exports = {
  initialize,
  model: () => Question,
  defineRelations
};
