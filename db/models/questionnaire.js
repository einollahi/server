const Sequelize = require('sequelize');

let Questionnaire;

const initialize = seq => {
  Questionnaire = seq.define('questionnaire', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'questionnaires'
  });
};

const defineRelations = () => {
  const User = require('./user')
  const Question = require('./question')

  Questionnaire.belongsTo(User.model(), {foreignKey: 'created_by'});
  Questionnaire.hasMany(Question.model(), {foreignKey: 'questionnaire_id'});
};

module.exports = {
  initialize,
  model: () => Questionnaire,
  defineRelations
};
