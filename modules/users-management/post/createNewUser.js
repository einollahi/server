const Repository = require('../repository/userRepository');

module.exports = class CreateNewUser {
  constructor() {
  }

  async handler(payload, user) {
    try {
      if (!payload || !payload.user_access || !payload.username || !payload.password || !payload.email) throw new Error('payload is not defined');
      const userFound = await new Repository().getUser(null, payload.username, payload.email);
      const personFound = await new Repository().getPerson(payload.national_code, payload.medical_number);

      if (userFound && userFound.username === payload.username) throw new Error('username already is in use');
      if (userFound && userFound.email === payload.email) throw new Error('somebody already registered with this email');
      if (personFound && personFound.national_code === payload.national_code) throw new Error('somebody already registered with this national code');
      if (personFound && payload.medical_number && personFound.medical_number === payload.medical_number) throw new Error('somebody already registered with this medical number');

      if (!payload.national_code || !payload.last_name || !payload.gender)
        throw new Error('personal information is not defined');

      const newPerson = await new Repository().createNewPerson({
        gender: payload.gender,
        first_name: payload.first_name ? payload.first_name : null,
        last_name: payload.last_name.trim(),
        national_code: payload.national_code,
        id_card_number: payload.id_card_number ? payload.id_card_number : null,
        mobile_phone: payload.mobile_phone ? payload.mobile_phone : null,
        isFaculty: payload.isFaculty ? payload.isFaculty : false,
        university: payload.university ? payload.university : null,
        university_grade: payload.university_grade ? payload.university_grade : null,
        medical_number: payload.medical_number ? payload.medical_number : null,
        speciality: payload.speciality ? payload.speciality : null,
        state: payload.state ? payload.state : null,
        city: payload.city ? payload.city : null,
        hospital: payload.hospital ? payload.hospital : null,
        hospital_address: payload.hospital_address ? payload.hospital_address : null,
        hospital_phone: payload.hospital_phone ? payload.hospital_phone : null,
        office_address: payload.office_address ? payload.office_address : null,
        office_phone: payload.office_phone ? payload.office_phone : null,
        avatar_url: payload.avatar_url ? payload.avatar_url : null
      });

      await new Repository().createNewUser({
        username: payload.username,
        password: payload.password,
        email: payload.email.trim(),
        role: payload.user_access ? payload.user_access : 'user',
        registered_by: user.id,
        first_seen: null,
        register_date: Date(Date.now()),
        person_id: newPerson.id
      });

      return {message: 'new user is added successfully'};
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
};
