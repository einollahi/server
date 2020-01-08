const Repository = require('../repository/questionnareRepository');

module.exports = class GetQuestion {
  constructor() {}

  async handler(payload) {
    if (!payload) throw new Error('payload is not found');

    return new Repository().getQuestionById(payload);
  }
}