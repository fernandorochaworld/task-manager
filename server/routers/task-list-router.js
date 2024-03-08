import express from 'express'
import tasklistRouter from express.Router()

/**
 * Import mongoose models
 */
import Person from '../models/person'
import TaskList from '../models/tasklist'
import Task from '../models/task'


tasklistRouter.get('/', async (request, response) => {
    const tasklists = await TaskList.find({})
    response.json(tasklists)
})

tasklistRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const tasklist = await TaskList.findById(id)
    response.json(tasklist)
})

tasklistRouter.post('/:id', async (request, response) => {
    // Get fields
    const personId = request.params.id
    const { name } = request.body
    // Error handling
    if (!name) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get person
    const person = await Person.findById(personId)
    if (!person) {
        return response.status(400).send({
            error: 'no such person exists to add the tasklist to'
        })
    }
    // Create new tasklist and save it
    const tasklist = new TaskList({
        name
    })
    const savedTaskList = await tasklist.save()
    // Add the tasklist to the person and save that
    person.tasklists = person.tasklists.concat(savedTaskList._id)
    await person.save()
    // Return the saved tasklist
    response.status(201).send(savedTaskList)
})

tasklistRouter.delete('/:id', async (request, response) => {
    // Get fields
    const tasklistId = request.params.id
    const { personId } = request.body
    // Check if the person exists
    const person = await Person.findById(personId)
    if (!person) {
        return response.status(400).send({
            error: 'no such person exists to remove the tasklist from'
        })
    }
    // Remove the tasklist from the person who owns it
    person.tasklists = person.tasklists.filter(id => id.toJSON() !== tasklistId)
    await person.save()
    // Remove the tasks
    const taskIds = (await TaskList.findById(tasklistId)).tasks.map(id => id.toJSON())
    await Promise.all(taskIds.map(id => Task.findByIdAndDelete(id)))
    // Remove the tasklist
    await TaskList.findByIdAndDelete(tasklistId)
    // Return response
    response.status(204).send()
})


export default tasklistRouter