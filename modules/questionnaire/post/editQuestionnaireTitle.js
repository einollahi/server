const Repository = require('../repository/questionnareRepository');

module.exports = class EditQuestionnaireTitle {
  constructor() {}

  async handler(payload, user) {
    
    if (!payload && !payload.id && !payload.title)
      throw new Error('payload is not defined');

    const questionnaireIsFound = await new Repository().getQuestionnaireById(payload.id);

    if (!questionnaireIsFound) throw new Error('questionnaire is not found or deleted before');

    return new Repository().editQuestionnaireTitle(payload.id, payload.title, user.id);
  }
}