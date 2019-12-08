const Repository = require('../repository/questionnareRepository');

module.exports = class GetAllQuestionnaire {
  constructor() {
  }

  async handler() {
    return new Repository().getAllQuestionnaire();
  }
};
