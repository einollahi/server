const Repository = require('../repository/userRepository');

module.exports = class CreateNewUser {
	constructor() {}

	async handler(payload, user) {
		if (!payload || !payload.username || !payload.password || !payload.email) throw new Error('payload is not defined');

		let userFound = await new Repository().getUser(null, payload.username, payload.email);

		if (userFound && userFound.username === payload.username) throw new Error('username already is in use');
		if (userFound && userFound.email === payload.email) throw new Error('somebody already registered with this email');

		return new Repository().createNewUser({
			username: payload.username,
			password: payload.password,
			email: payload.email,
			role: payload.role ? payload.role : 'user'
		});
	}
};
