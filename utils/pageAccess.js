const admin = 'admin';
const moderator = 'moderator';
const vip_user = 'vip_user';
const user = 'user';

module.exports = {
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
}
