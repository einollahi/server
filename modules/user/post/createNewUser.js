const Repository = require('../repository/userRepository');

module.exports = class CreateNewUser {
	constructor() {}

	async handler(payload, user) {
		if (!payload || !payload.username || !payload.password || !payload.email) throw new Error('payload is not defined');

		let userFound = await new Repository().getUserByUsername(payload.username);

		if (userFound) throw new Error('username already is in use');

		userFound = await new Repository().getUserByEmail(payload.email);

		if (userFound) throw new Error('somebody already registered with this email');

		return new Repository().createNewUser({
			username: payload.username,
			password: payload.password,
			email: payload.email,
			role: payload.role ? payload.role : 'user'
		});
	}
};
