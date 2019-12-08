const Repository = require('../repository/questionnareRepository');

module.exports = class CreateNewQuestionnaire {
  constructor(){}

  async handler(payload, user) {

    if (!payload.title) throw new Error('questionnaire title is not defined');

    const foundQuestionnare =await new Repository().getQuestionnaireByTitle(payload.title);

    if (foundQuestionnare) throw new Error('some other questionnaire already is available with this title');

    await new Repository().createNewQuestionnare(payload.title, payload.description, user.id);

    return {message: 'new questionnaire added successfully'};
  }

}
