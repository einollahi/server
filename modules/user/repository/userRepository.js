const bcrypt = require('bcryptjs');

const {Op} = require('../../../db/index');
const User = require('../../../db/models/user');
const Person = require('../../../db/models/person');

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

  async getAllUsers(order) {
    const orderClause = [];
    if (order === 'byName') orderClause.push(['last_name', 'ASC'], ['first_name', 'ASC']);
    else orderClause.push(['createdAt', 'Desc']);

    const users = await User.findAll({
      where: {[Op.not]: [{username: 'admin'}]},
      attributes: {exclude: ['id', 'password', 'personId']},
      include: [
        {
          attributes: {exclude: ['createdAt', 'updatedAt']},
          model: Person,
          required: false
        }
      ],
      order: [['createdAt', 'Desc']]
    }).map(el => el.get({plain: true}));

    return users.length ? users : null;
  }

  // post
  async createNewUser({username, password, email, role, active = true, personId}) {
    return User.create({
      username: username,
      password: bcrypt.hashSync(password, 10),
      email,
      role,
      active,
      personId
    });
  }

  async createNewPerson({first_name, last_name, gender, avatar_url, national_code, medical_number, speciality, hospital, phone, address}) {
    return Person.create({
      first_name,
      last_name,
      gender,
      avatar_url,
      national_code,
      medical_number,
      speciality,
      hospital,
      phone,
      address
    });
  }

  async activateUser({id, username, email}) {
    return User.update({active: true}, {where: {[Op.or]: [{id}, {username}, {email}]}});
  }

  async deactivateUser({id, username, email}) {
    return User.update({active: false}, {where: {[Op.or]: [{id}, {username}, {email}]}});
  }
};
