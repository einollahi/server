const fs = require('fs');
const access = require('../utils/pageAccess');

module.exports = class Command {
  constructor(module, command) {
    this.module = module;
    this.command = command;
  }

  async getHandler(payload, user) {
    try {
      const moduleAddress = ['..', 'modules', this.module, 'get', this.command].join('/');

      const query = require(moduleAddress);
      
      if (access[this.module]['get'][this.command] && (access[this.module]['get'][this.command] !=='all' && !access[this.module]['get'][this.command].includes(user.role)))
        throw new Error('you have not the right to access this page');

      return new query().handler(payload, user);
    } catch (e) {
      console.log(e);
    }
  }

  async postHandler(payload, user) {
    try {

      const moduleAddress = ['..', 'modules', this.module, 'post', this.command].join('/');

      const command = require(moduleAddress);

      if (access[this.module]['post'][this.command] && (access[this.module]['post'][this.command] !== 'all' && !access[this.module]['post'][this.command].includes(user.role)))
        throw new Error('you have not the right to access this page');

      return new command().handler(payload, user);
    } catch (e) {
      console.log(e);
    }

  }
};
