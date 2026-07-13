const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');
const { conn } = require('../../src/db');

describe('Pokemon routes', () => {
  before(() => conn.authenticate());
  beforeEach(() => conn.sync({ force: true }));

  describe('GET /pokemons', () => {
    it('responds with 200 and a list of Pokemon', async () => {
      const { body } = await request(app).get('/pokemons').expect(200);
      expect(body).to.be.an('array');
      expect(body[0]).to.include.keys('id', 'name', 'types', 'image');
    }).timeout(20000);

    it('responds with 404 when no Pokemon matches the name', () => request(app)
      .get('/pokemons?name=notapokemon')
      .expect(404)).timeout(20000);
  });

  describe('GET /pokemons/:id', () => {
    it('responds with 404 for an unknown database id', () => request(app)
      .get('/pokemons/6d1f7a2c-0000-4000-8000-000000000000')
      .expect(404));
  });

  describe('POST /pokemons', () => {
    it('creates a Pokemon and responds with 201', async () => {
      const { body } = await request(app)
        .post('/pokemons')
        .send({ name: 'Henry', life: 50, attack: 60 })
        .expect(201);

      expect(body.name).to.equal('Henry');
      expect(body.createdInDb).to.equal(true);
      expect(body.types).to.deep.equal([]);
    });

    it('responds with 400 when required fields are missing', () => request(app)
      .post('/pokemons')
      .send({ attack: 60 })
      .expect(400));
  });
});
