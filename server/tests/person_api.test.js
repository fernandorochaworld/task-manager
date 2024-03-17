const supertest = require('supertest');
const Person = require("../models/person");
const helper = require('./test_helper');
const server = require('../server'); // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router
const { closeConnection } = require('../config/db');
const api = supertest(server); // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Clear data and load new entries for tests
  await helper.clearData();
  // Load initial data for testing
  await helper.load();
});

describe('Maintain Tasklist test', () => {


  /**
   * Test Listing all people
   */
  test('test person index', async () => {
    const response = await api.get('/api/person');
    expect(response.body).toHaveLength(3);
  });


  /**
   * Test retuning one person
   */
  test('test person show one', async () => {
    const person1 = await Person.findOne({ username: 'admin' });

    // Verify that we get the same person
    const response = await api
      .get(`/api/person/${person1.id}`)
      .expect(200);

    // As stated above, we will compare the conversionRate and personCode
    const personReceived = response.body;
    expect(person1.username).toEqual(personReceived.username);
  });
});


/**
 * Test adding one person
 */
describe('POST tests', () => {
  // Add a person, and verify that a person is added to our database
  const newPerson = { username: 'tmp-user', password: 'tmp-user' };
  test('test insert person', async () => {

    // ADD Person
    const responsePerson = await api
      .post('/api/person')
      .send(newPerson)
      .expect(201);

    expect(responsePerson.body?.id).toBeDefined();

    const dbPerson = await Person.findOne({ username: newPerson.username })

    // Verify that we get the same person
    expect(dbPerson.username).toEqual(newPerson.username);
  });
});


/**
 * Test removing one person
 */
describe('DELETE person', () => {
  // Delete a person, and verify that a person has been deleted
  test('delete person', async () => {

    const person1 = await Person.findOne({ username: 'admin' });

    await api
      .delete(`/api/person/${person1.id}`)
      .expect(204);

    const personDb = await Person.findOne({ username: 'admin' });
    expect(personDb).toBeNull();

  });
});


afterAll(async () => {
  // Closes connection after all tests run
  closeConnection();
  console.log('Closing .......');
});
