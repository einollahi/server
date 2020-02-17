const all = 'all';
const admin = 'admin';
const moderator = 'moderator';
const vip_user = 'vip_user';
const user = 'user';

module.exports = {
  system: {
    get: {
      userAuthenticationCheck: all,
      getUserProfile: [admin, moderator, vip_user, user]
    }
  },
  user: {
    get: {
      getAllUsers: [admin, moderator],
      getUser: [admin, moderator],
      getUserAuthentication: [admin, moderator, vip_user, user],
    },
    post: {
      createNewUser: [admin, moderator]
    }
  },
  'users-management': {
    get: {
      getAllUsers: [admin, moderator],
      getUser: [admin, moderator],
      getUserAuthentication: [admin, moderator, vip_user, user],
    },
    post: {
      createNewUser: [admin, moderator]
    }
  },
  questionnaire: {
    get: {
      getAllQuestionnaire: [admin, moderator],
      getQuestionnaireById: [admin, moderator],
    },
    post: {
      createNewQuestionnaire: [admin, moderator],
      addNewQuestion: [admin, moderator],
    }
  }
}
