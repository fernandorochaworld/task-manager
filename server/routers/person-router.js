import bcrypt from 'bcryptjs'
import express from 'express'

/**
 * Import mongoose models
 */
import Person from '../models/person.js'
import TaskList from '../models/task-list.js'
import Task from '../models/task.js'

const personRouter =  express.Router()

/**
 * @receives a GET request to the URL: http://localhost:3001/api/people/about
 * @returns a basic message
 */
personRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First endpoint for people router'
  })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/people
 * @returns bulk persons list as a JSON
 */
personRouter.get('/', async (request, response) => {
  const people = await Person.find({})
  response.json(people)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/people/:id
 * @returns a specific person 
 */
personRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const person = await Person.findById(id)
  response.json(person)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/people
 * @returns the newly created person
 */
personRouter.post('/', async (request, response) => {
  // Get fields
  const { name, password } = request.body
  // Error handling
  if (!name || !password) {
    return response.status(400).send({
      error: 'missing content in body'
    })
  }
  // Check if person already exists
  const duplicateCount = await Person.countDocuments({ name }).exec()
  if (duplicateCount !== 0) {
    return response.status(400).send({
      error: 'name not available'
    })
  }
  // Perform hash
  const passwordHash = await bcrypt.hash(password, 10)
  // Create new person
  const person = new Person({
    name, passwordHash
  })
  // Update people and return resource
  const personResponse = await person.save()
  response.status(201).send(personResponse)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/people/:id
 * Note: The :id required is the id of the PERSON we want to delete
 * @returns an appropriate status code
 */
personRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  // Get tasklists to delete
  const tasklistIds = (await Person.findById(id)).tasklists.map(id => id.toJSON())
  // Get the tasks to delete
  const tasklists = await Promise.all(tasklistIds.map(id => TaskList.findById(id)))
  const tasks = tasklists.map(tasklist => tasklist.tasks)
  const taskIds = tasks.flat().map(id => id.toJSON())
  // Perform deletions (person, tasklists, task)
  await Person.findByIdAndDelete(id)
  await Promise.all(tasklistIds.map(id => TaskList.findByIdAndDelete(id)))
  await Promise.all(taskIds.map(id => Task.findByIdAndDelete(id)))
  response.status(200).send()
})


export default personRouter;