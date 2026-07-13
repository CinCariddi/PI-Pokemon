const { expect } = require('chai');
const { Pokemon, conn } = require('../../src/db');

describe('Pokemon model', () => {
  before(() => conn.authenticate());
  beforeEach(() => conn.sync({ force: true }));

  describe('name', () => {
    it('throws when name is missing', async () => {
      try {
        await Pokemon.create({ life: 50 });
        expect.fail('It should require a name');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
      }
    });

    it('creates a Pokemon with a valid name and life', async () => {
      const pokemon = await Pokemon.create({ name: 'Pikachu', life: 50 });
      expect(pokemon.name).to.equal('Pikachu');
    });
  });

  describe('life', () => {
    it('throws when life is above 100', async () => {
      try {
        await Pokemon.create({ name: 'Pikachu', life: 150 });
        expect.fail('It should reject life above 100');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
      }
    });
  });

  describe('createdInDb', () => {
    it('defaults to true', async () => {
      const pokemon = await Pokemon.create({ name: 'Pikachu', life: 50 });
      expect(pokemon.createdInDb).to.equal(true);
    });
  });
});
