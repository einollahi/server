const Repository = require('../repository/userRepository');

module.exports = class CreateNewPerson {
  constructor() {
  }

  async handler(payload, user) {
    if (!paylaod)
      throw new Error('payload is not defined');

    const person = {
      first_name: payload.first_name ? payload.first_name : null,
      last_name: payload.last_name ? payload.last_name : null,
      avatar_url: payload.avatar_url ? payload.avatar_url : null,
      national_code: payload.national_code ? payload.national_code : null,
      birth_date: payload.birth_date ? payload.birth_date : null,
      mobile: payload.mobile ? payload.mobile : null,
      phone: payload.phone ? payload.phone : null,
      data_json: payload.data_json ? payload.data_json : null
    };

    return new Repository().createNewPerson(payload.userId, person);
  }
}
