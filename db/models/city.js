const Sequelize = require('sequelize');

let City;

const initialize = seq => {
  City = seq.define('city', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    tableName: 'cities',
    timestamps: false,
    underscored: true,
  });
};

const defineRelations = () => {
  const Person = require('./city')

  // City.belongsTo(Person.model(), {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'})
};

module.exports = {
  initialize,
  model: () => City,
  defineRelations
};
