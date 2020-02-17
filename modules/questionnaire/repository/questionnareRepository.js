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
        required: false
      }],
      order: [[Question, 'position', 'ASC']]
    });

    if (questionnaire)
      return questionnaire.get({plain: true});

    return null;
  }

  async getAllQuestionnaire() {
    const result = await Questionnaire.findAll({
      attributes: {exclude: ['updatedAt']},
      include: [
        {
          attributes: {exclude: ['createdAt', 'updatedAt']},
          model: Question,
          required: false
        }
      ],
      order: [['createdAt', 'Desc']]
    });
    
    if (result[0])
      return result.map(el => el.get({plain: true}));

    return null;
  }

  async getQuestionById(id) {
    return Question.findOne({where: {id}, raw: true});
  }

  // post
  async createNewQuestionnare(title, description, created_by) {
    return Questionnaire.create({title, description, created_by});
  }

  async addNewQuestion(title, question_type, position, options, multi_answer, created_by, questionnaire_id) {
    return Question.create({
      title,
      question_type,
      position,
      options,
      multi_answer,
      created_by,
      questionnaire_id
    });
  }

  async deleteQuestion(id) {
    return Question.destroy({where: {id}});
  }

  async editQuestion(payload, created_by) {
    
    return Question.update({
      title: payload.questionTitle,
      question_type: payload.questionType,
      position: payload.questionNumber,
      options: payload.questionOptions,
      multi_answer: payload.multiAnswer,
      created_by,
      questionnaire_id: payload.questionnaireId
      }, {where: {id: payload.questionId}
    });

  }

  async editQuestionnaireTitle(id, title, userId) {
    return Questionnaire.update({title, userId}, {where: {id}});
  }

};
