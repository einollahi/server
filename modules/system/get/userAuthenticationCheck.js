const jwt = require('jsonwebtoken');
const Repository = require('../../users-management/repository/userRepository');

module.exports = class UserAuthenticationCheckUserAuthenticationCheck {
  constructor() {
  }

  async handler(payload, user) {
    try {
      const isAuthenticated = jwt.verify(payload, 'secretCode');

      if (!isAuthenticated)
        return false;

      const authenticatedUser = await new Repository().getUser(isAuthenticated.userId, isAuthenticated.username, isAuthenticated.email);

      if (!authenticatedUser || !authenticatedUser.active)
        throw new Error('user is not defined or activate yet');

      return {
        username: authenticatedUser.username,
        email: authenticatedUser.email,
        access: authenticatedUser.role
      };

    } catch (e) {
      return false;
    }

  }
}
