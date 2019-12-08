const Repository = require('../repository/questionnareRepository');

module.exports = class GetQuestionnaireById {
  constructor() {
  }

  async handler(payload) {
    if (!payload.id) throw new Error('payload id is not defined');

    return new Repository().getQuestionnaireById(payload.id);
  }
};
