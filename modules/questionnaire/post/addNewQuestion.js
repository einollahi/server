const Repository = require('../repository/questionnareRepository');

module.exports = class AddNewQuestion {
  constructor() {}

  async handler(payload, user) {

    if (!payload || !payload.questionnaireId || !payload.questionTitle || !payload.questionType || !payload.questionNumber)
      throw new Error('payload is not defined');

    if(!user)
      throw new Error('user is not defined');

    return new Repository().addNewQuestion(payload.questionTitle, payload.questionType, payload.questionNumber, payload.questionOptions, payload.multiAnswer, user.id, payload.questionnaireId);
  }
}
