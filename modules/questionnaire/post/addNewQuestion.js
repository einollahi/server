const Repository = require('../repository/questionnareRepository');

module.exports = class AddNewQuestion {
  constructor() {}

  async handler(payload, user) {

    if (!payload || !payload.questionId || !payload.questionTitle || !payload.questionType || !payload.questionNumber)
      throw new Error('payload is not defined');

    if(!user)
      throw new Error('user is not defined');

    return new Repository().addNewQuestion(payload.questionTitle, payload.questionType, payload.questionNumber, payload.questionOptions, user.id, payload.questionId);
  }
}