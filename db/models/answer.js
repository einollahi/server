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
  const Question = require('./question')

  Answer.belongsTo(Question.model(), {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'});
};

module.exports = {
  initialize,
  model: () => Answer,
  defineRelations
};
