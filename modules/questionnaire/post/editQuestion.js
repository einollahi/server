const Repository = require('../repository/questionnareRepository');

module.exports = class EditQuestion {
  constructor() {}

  async handler(payload, user) {
    
    if (!payload || !payload.questionId || !payload.questionnaireId || !payload.questionTitle || !payload.questionType || !payload.questionNumber)
      throw new Error('payload is not defined');

    const questionIsFound = await new Repository().getQuestionById(payload.questionId);

    if (!questionIsFound) throw new Error('question is not found or deleted before');

    return new Repository().editQuestion(payload, user.id);
  }
}