const User = require('../db/models/user');
const bcrypt = require('bcryptjs');

(async () => {
	try {
		const adminFound = await User.findOne({ where: { role: 'admin' } });

		if (!adminFound) {
			await User.create({
				username: 'admin',
				password: bcrypt.hashSync('123456', 10),
				email: 'ali@test.com',
				role: 'admin',
				active: true
			});

			console.log('--> Admin is Added');
		}
	} catch (err) {
		console.log(err);
	} finally {
		process.exit();
	}
})();
