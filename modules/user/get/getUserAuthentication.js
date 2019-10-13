const Repository = require('../repository/userRepository');

module.exports = class GetUserAuthentication {
  constructor() {
  }

  async handler(payload, user) {
    if (!payload && !payload.userId && !payload.username)
      throw new Error('payload is not defined');

    if (payload.userId !== user.id)
      throw new Error('error in authentication');

    const getUser = await new Repository().getUser(payload.userId, payload.username, null);
    if (!getUser.active)
      throw new Error('user is not activated yet');

    return getUser.role;
  }

}
