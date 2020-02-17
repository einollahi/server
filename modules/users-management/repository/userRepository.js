const bcrypt = require('bcryptjs');

const {Op} = require('../../../db/db');
const {User, Person} = require('../../../db/db');

module.exports = class Repository {
  constructor() {
  }

  // get
  async getUser(id, username, email) {
    return User.findOne({
      attributes: {exclude: ['id', 'password']},
      where: {[Op.or]: [{username}, {email}]},
      raw: true
    });
  }

  async getPerson(national_code, medical_number = '0000000000') {
    return Person.findOne({
      attributes: {exclude: ['id']},
      where: {[Op.or]: [{national_code}, {medical_number}]},
      raw: true
    });
  }

  async getAllUsers(order) {
    const orderClause = [];
    if (order === 'byName') orderClause.push(['last_name', 'ASC'], ['first_name', 'ASC']);
    else orderClause.push(['createdAt', 'Desc']);

    const users = await User.findAll({
      where: {[Op.not]: [{username: 'admin'}]},
      attributes: {exclude: ['id', 'password', 'personId', 'updatedAt']},
      include: [
        {
          attributes: {exclude: ['createdAt', 'updatedAt']},
          model: Person,
          required: false
        }
      ],
      order: orderClause
    });

    if (users && users.length)
      return users.map(el => el.get({plain: true}));

    return null;
  }

  async getUserProfile(id) {
    return User.findOne({
      where: {id},
      attributes:['username'],
      include: [{
        model: Person,
        attributes:['first_name', 'last_name', 'avatar_url'],
        required: true
      }]
    });
  }

  // post
  async createNewUser({username, password, email, role, active = true, registered_by, first_seen, register_date, person_id}) {
    return User.create({
      username,
      password: bcrypt.hashSync(password, 10),
      email,
      role,
      active,
      registered_by,
      first_seen,
      register_date,
      person_id
    });
  }

  async createNewPerson({
                          gender, first_name, last_name, national_code, id_card_number, mobile_phone, isFaculty, university,
                          university_grade, medical_number, speciality, state, city, hospital, hospital_address, hospital_phone,
                          office_address, office_phone, avatar_url
                        }) {

    return Person.create({
      gender,
      first_name,
      last_name,
      national_code,
      id_card_number,
      mobile_phone,
      isFaculty,
      university,
      university_grade,
      medical_number,
      speciality,
      state,
      city,
      hospital,
      hospital_address,
      hospital_phone,
      office_address,
      office_phone,
      avatar_url
    });
  }

  async activateUser({id, username, email}) {
    return User.update({active: true}, {where: {[Op.or]: [{id}, {username}, {email}]}});
  }

  async deactivateUser({id, username, email}) {
    return User.update({active: false}, {where: {[Op.or]: [{id}, {username}, {email}]}});
  }
};
