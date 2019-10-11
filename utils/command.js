const fs = require('fs');
const access = require('../utils/pageAccess')

module.exports = class Command {
	constructor(module, command) {
		this.module = module;
		this.command = command;
	}

	async getHandler(payload, user) {
		const moduleAddress = ['..', 'modules', module, 'get', command].join('/');

		const query = require(moduleAddress);

		if (access[this.module]['get'][this.command].includes(user.role)) throw new Error('you have not the right to access this page');

		return new query().handler(payload, user);
	}

	async postHandler(payload, user) {
		const moduleAddress = ['..', 'modules', this.module, 'post', this.command].join('/');

		const command = require(moduleAddress);

		if (access[this.module]['post'][this.command]) throw new Error('you have not the right to access this page');
		console.log('22');

		return new command().handler(payload, user);
	}
};
