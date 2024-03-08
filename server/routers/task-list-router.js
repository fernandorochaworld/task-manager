import express from 'express'

/**
 * Import mongoose models
 */
import Person from '../models/person.js'
import TaskList from '../models/task-list.js'
import Task from '../models/task.js'

const tasklistRouter = express.Router()

tasklistRouter.get('/:personId/tasklist', async (request, response) => {
    const person_id = request.params.personId
    const tasklists = await TaskList.find({person_id});
    response.json(tasklists)
})

tasklistRouter.get('/:personId/tasklist/:id', async (request, response) => {
    const _id = request.params.id
    const person_id = request.params.personId
    const tasklist = await TaskList.findOne({_id, person_id}).populate(['tasks'])
    // const tasklist = await TaskList.findById(id)
    response.json(tasklist)
})

tasklistRouter.post('/:personId/tasklist', async (request, response) => {
    // Get fields
    const person_id = request.params.personId
    const { name } = request.body
    // Error handling
    if (!name) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get person
    const person = await Person.findById(person_id)
    if (!person) {
        return response.status(400).send({
            error: 'no such person exists to add the tasklist to'
        })
    }
    // Create new tasklist and save it
    const tasklist = new TaskList({
        name,
        person_id
    })
    const savedTaskList = await tasklist.save()
    // Add the tasklist to the person and save that
    // person.tasklists = person.tasklists.concat(savedTaskList._id)
    // await person.save()
    // Return the saved tasklist
    response.status(201).send(savedTaskList)
})

tasklistRouter.put('/:personId/tasklist/:id', async (request, response) => {
    // Get fields
    const _id = request.params.id
    const person_id = request.params.personId
    const { name } = request.body
    // Error handling
    if (!name) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get person
    const person = await Person.findById(person_id)
    if (!person) {
        return response.status(400).send({
            error: 'no such person exists to add the tasklist to'
        })
    }
    const tasklist = await TaskList.findOne({_id, person_id})
    tasklist.name = name;
    const savedTaskList = await tasklist.save()
    // Add the tasklist to the person and save that
    // person.tasklists = person.tasklists.concat(savedTaskList._id)
    // await person.save()
    // Return the saved tasklist
    response.status(201).send(savedTaskList)
})

tasklistRouter.delete('/:personId/tasklist/:id', async (request, response) => {
    // Get fields
    const id = request.params.id
    const { personId } = request.body
    // Check if the person exists
    const person = await Person.findById(personId)
    if (!person) {
        return response.status(400).send({
            error: 'no such person exists to remove the tasklist from'
        })
    }
    const tasklist = await TaskList.findOne({_id, person_id})
    // Remove the tasklist from the person who owns it
    // person.tasklists = person.tasklists.filter(id => id.toJSON() !== tasklistId)
    // await person.save()
    // Remove the tasks
    await Task.find({tasklist_id: id}).remove();
    // const taskIds = (await TaskList.findById(tasklistId)).tasks.map(id => id.toJSON())
    // await Promise.all(taskIds.map(id => Task.findByIdAndDelete(id)))
    // Remove the tasklist
    // await TaskList.findByIdAndDelete(id)
    await tasklist.remove();
    // Return response
    response.status(204).send()
})


export default tasklistRouter