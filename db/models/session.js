const Sequelize = require('sequelize');

let Session;

const initialize = seq => {
  Session = seq.define('session', {
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    sess: {
      type: Sequelize.JSON,
      allowNull: false
    },
    expire: {
      type: 'TIMESTAMP',
      allowNull: false
    }
  }, {
    tableName: 'session',
    timestamps: false,
    underscored: true,
  });
};

const defineRelations = () => {};

module.exports = {
  initialize,
  model: () => Session,
  defineRelations
};
