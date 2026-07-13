const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
      validate: {
        isUrl: true,
      },
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 100 },
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
    },
    height: {
      type: DataTypes.INTEGER,
      validate: { min: 0 },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: { min: 0 },
    },
    // Distinguishes user-created Pokemon from the ones coming from PokeAPI.
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    tableName: 'pokemons',
  });
};
