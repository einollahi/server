const Repository = require('../repository/userRepository');

module.exports = class GetUser {
  constructor() {
  }

  async handler(payload, user) {
    if (!payload && (!payload.id || !payload.username || !payload.email))
      throw new Error('payload is not define');

    payload.id = payload.id ? payload.id : null;
    payload.username = payload.username ? payload.username : null;
    payload.email = payload.email ? payload.email : null;
    return new Repository().getUser(
      payload.id,
      payload.username,
      payload.email
    );
  }
};
