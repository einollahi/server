const Repository = require('../repository/questionnareRepository');

module.exports = class DeleteQuestion {
  constructor() {}

  async handler(payload) {

    if (!payload) throw new Error('payload is not found');

    const questionIsFound = await new Repository().getQuestionById(payload);

    if (!questionIsFound) throw new Error('question is not found or deleted before');

    // Some other check must added
    
    return new Repository().deleteQuestion(payload);

  }
}