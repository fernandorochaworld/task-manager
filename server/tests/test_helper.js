/**
 * Provide the path to your test currency model, this model will be exactly the same as your Currency model, except...
 * It will not require the connection to Country.
 */
const bcrypt = require('bcryptjs');
const Person = require("../models/person.js");

/**
 * We need to initialize our test tables, so we will write variables to store our initial database state,
 * as well as some helper functions that can be used in our tests!
 */

const initialUsers = [
  {username: 'admin'},
  {username: 'test'},
  {username: 'aux'},
];

// Perform a bulk write
const load = async () => {
  const users = await Promise.all(initialUsers.map( async ({username}) => {
    const passwordHash = await bcrypt.hash(username, 10);
    return {
      username,
      passwordHash
    }
  }));
  await Person.insertMany(users);
};


// Clears all test tables in the database
const clearData = async () => {
  await Person.deleteMany({});
};

module.exports = {
  initialUsers,
  load,
  clearData
};
