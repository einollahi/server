const {Op} = require('../../../db/db');
const {User} = require('../../../db/db');
const {Person} = require('../../../db/db');

module.exports = class Repository {
  constructor() {
  }

  // get
  async getUser(id, username, email) {
    return User.findOne({
      attributes: {exclude: ['id', 'password', 'personId']},
      where: {[Op.or]: [{id}, {username}, {email}]},
      include: [
        {
          attributes: {exclude: ['createdAt', 'updatedAt']},
          model: Person,
          required: false
        }
      ]
    });
  }

  // post

};
