const {sequelize, Op} = require('../../../db/db');
const {Questionnaire, Question} = require('../../../db/db');

module.exports = class Repository {
  constructor() {
  }

  // get
  async getQuestionnaireByTitle(title) {
    return Questionnaire.findOne({where: {title}, raw: true});
  }

  async getQuestionnaireById(id) {
    const questionnaire = await Questionnaire.findOne({
      where: {id},
      include: [{
        model: Question,
        required: false,
        order: [['position'], ['asc']]
      }]
    });

    if (questionnaire)
      return questionnaire.get({plain: true});

    return null;
  }

  async getAllQuestionnaire() {
    return Questionnaire.findAll({
      attributes: {exclude: ['updatedAt', 'userId']},
      include: [
        {
          attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
          model: Question,
          required: false,
          separate: true
        }
      ],
      order: [['createdAt', 'Desc']],
      raw: true
      });
  }

  // post
  async createNewQuestionnare(title, description, userId) {
    return Questionnaire.create({title, description,userId});
  }

  async addNewQuestion(title, question_type, position, options, userId, questionnaireId) {
    return Question.create({
      title,
      question_type,
      position,
      options,
      userId,
      questionnaireId
    });
  }
};
