const bcrypt = require('bcryptjs');

const User = require('../../../db/models/user');

module.exports = class Repository {
	constructor() {}

	// get
	async getUserByUsername(username) {
		return User.findOne({ where: { username } });
	}

	async getUserByEmail(email) {
		return User.findOne({ where: { email } });
	}

	// post
	async createNewUser({ username, password, email, role }) {
		return User.create({
			username: username,
			password: bcrypt.hashSync(password, 10),
			email,
			role
		});
	}
};
