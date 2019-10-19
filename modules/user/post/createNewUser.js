const Repository = require('../repository/userRepository');

module.exports = class CreateNewUser {
  constructor() {
  }

  async handler(payload, user) {
    if (!payload || !payload.username || !payload.password || !payload.email) throw new Error('payload is not defined');

    let userFound = await new Repository().getUser(null, payload.username, payload.email);

    if (userFound && userFound.username === payload.username) throw new Error('username already is in use');
    if (userFound && userFound.email === payload.email) throw new Error('somebody already registered with this email');

    if (!payload.national_code || !payload.last_name || !payload.gender)
      throw new Error('personal informations are not defined');


    const newUser = await new Repository().createNewPerson({
      first_name: payload.first_name ? payload.first_name.trim() : null,
      last_name: payload.last_name.trim(),
      gender: payload.gender,
      avatar_url: payload.avatar_url ? payload.avatar_url : null,
      national_code: payload.national_code.trim(),
      medical_number: payload.medical_number ? payload.medical_number : null,
      speciality: payload.speciality ? payload.speciality.trim() : null,
      hospital: payload.hospital ? payload.hospital.trim() : null,
      phone: payload.phone,
      address: payload.address ? payload.address.trim() : null
    });

    return new Repository().createNewUser({
      username: payload.username,
      password: payload.password,
      email: payload.email.trim(),
      role: payload.role ? payload.role : 'user',
      personId: newUser.get({plain: true}).id
    });


  }
};
