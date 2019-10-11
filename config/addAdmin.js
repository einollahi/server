const User = require('../db/models/user');

(async () => {
	try {
		const adminFound = await User.findOne({ where: { role: 'admin' } });

		if (!adminFound) {
			const createUser = require('../modules/user/post/createNewUser');

			await new createUser().handler(
				{ username: 'admin', password: '123456', email: 'admin@test.com', role: 'admin' },
				null
			);

			console.log('--> Admin is Added');
		}
	} catch (err) {
		console.log(err);
	} finally {
		process.exit();
	}
})();
