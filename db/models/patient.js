const Sequelize = require('sequelize');

let Patient;

const initialize = seq => {
  Patient = seq.define('patient', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    national_code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthday: {
      type: Sequelize.DATE
    }
  },
  {
    tableName: 'patients'
  });
};

const defineRelations = () => {
  const User = require('./user');
  const Answer = require('./answer');

  Patient.belongsTo(User.model(), {foreignKey:'created_by'});
  Patient.hasMany(Answer.model(), {foreignKey: 'patient_id'});
};

module.exports = {
  initialize,
  model: () => Patient,
  defineRelations
};
