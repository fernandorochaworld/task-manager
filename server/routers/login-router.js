const bcrypt = require('bcryptjs');
const express = require('express');
const loginRouter = express.Router();

/**
 * const mongoose model
 */
const Person = require('../models/person.js');

/**
 * @receives a POST request to the URL: http://localhost:3001/api/login
 * @returns the person one has logged in with
 */
loginRouter.post('/', async (request, response) => {
  // Get fields
  const { username, password } = request.body
  // Error handling
  if (!username || !password) {
    return response.status(400).send({
      error: 'please, provide username and password'
    })
  }
  // Get user
  const person = await Person.findOne({ username })
  // Check if password is correct
  const passwordCorrect = person === null ? false : await bcrypt.compare(password, person.passwordHash)
  // Person check
  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  // Return user information on success
  response.status(200).send(person)
})


module.exports = loginRouter