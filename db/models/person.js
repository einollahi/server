const Sequelize = require('sequelize');

let Person;

const initialize = seq => {
  Person = seq.define('person', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    national_code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    id_card_number: {
      type: Sequelize.STRING
    },
    mobile_phone: {
      type: Sequelize.STRING
    },
    isFaculty: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    university: {
      type: Sequelize.STRING
    },
    university_grade: {
      type: Sequelize.STRING
    },
    medical_number: {
      type: Sequelize.STRING
    },
    speciality: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    hospital: {
      type: Sequelize.STRING
    },
    hospital_address: {
      type: Sequelize.STRING
    },
    hospital_phone: {
      type: Sequelize.JSON
    },
    office_address: {
      type: Sequelize.STRING
    },
    office_phone: {
      type: Sequelize.JSON
    },
    avatar_url: {
      type: Sequelize.STRING
    },
  },{
    tableName: 'persons',
  });
};

const defineRelations = () => {
  const User = require('./user');

  Person.hasOne(User.model(), {foreignKey: {allowNull: true}, onDelete: 'RESTRICT'})
};

module.exports = {
  initialize,
  model: () => Person,
  defineRelations
};

