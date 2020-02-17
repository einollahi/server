const Repository = require('../../users-management/repository/userRepository');

module.exports = class GetUserProfile {
  constructor() {
  }

  async handler(payload, user) {    
    if (!user || !user.id) throw new Error('user is not found');

    if (user.role === 'admin')
      return {last_name: 'admin'}
    else {
      const userProfile = await new Repository().getUserProfile(user.id);

      return {
        username: userProfile.username,
        first_name: userProfile.person.first_name,
        last_name: userProfile.person.last_name,
        avatar: userProfile.person.avatar_url
      };
    }
  }
}
