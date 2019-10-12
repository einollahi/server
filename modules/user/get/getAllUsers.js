const Repository = require('../repository/userRepository');

module.exports = class GetAllUsers {
  constructor() {
  }

  async handler() {
    return new Repository().getAllUsers();
  }
};
