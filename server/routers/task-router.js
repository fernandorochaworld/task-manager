import express from "express";

/**
 * Import mongoose models
 */
import TaskList from '../models/task-list.js'
import Task from '../models/task.js'

const taskRouter = express.Router()

taskRouter.get('/about', async (request, response) => {
    response.json({
        message: 'First endpoint for tasks router'
    })
})

taskRouter.get('/', async (request, response) => {
    const tasks = await Task.find()
    response.json(tasks)
})

taskRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const task = await Task.findById(id)
    response.json(task)
})

taskRouter.post('/:id', async (request, response) => {
    // Get fields
    const tasklistId = request.params.id
    const { title, description, status, priority, dueDate } = request.body
    // Error handling
    if (!title || !status || !priority || !dueDate) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get tasklist
    const tasklist = await TaskList.findById(tasklistId)
    if (!tasklist) {
        return response.status(400).send({
            error: 'no such tasklist exists to add the task to'
        })
    }
    // Create the task and save it 
    const task = new Task({
        title, description, status, priority, dueDate
    })
    const savedTask = await task.save()
    // Add the task to the tasklist, and save that!
    tasklist.tasks = tasklist.tasks.concat(savedTask._id)
    await tasklist.save()
    // Return the saved task
    return response.status(201).json(savedTask)
})

taskRouter.put('/:id', async (request, response) => {
    // Get fields
    const taskId = request.params.id

    const task = await Task.findById(id)

    const tasklistId = request.params.taskListId
    const { title, description, status, priority, dueDate } = request.body
    // Error handling
    if (!title || !status || !priority || !dueDate) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get tasklist
    const tasklist = await TaskList.findById(tasklistId)
    if (!tasklist) {
        return response.status(400).send({
            error: 'no such tasklist exists to add the task to'
        })
    }
    // Create the task and save it 
    // const task = new Task({
    //     title, description, status, priority, dueDate
    // })
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;

    const savedTask = await task.save()
    // // Add the task to the tasklist, and save that!
    // tasklist.tasks = tasklist.tasks.concat(savedTask._id)
    // await tasklist.save()
    // Return the saved task
    return response.status(201).json(savedTask)
})

taskRouter.delete('/:id', async (request, response) => {
    // Get fields
    const taskId = request.params.id
    const { tasklistId } = request.body
    // Check if the tasklist exists
    const tasklist = await TaskList.findById(tasklistId)
    if (!tasklist) {
        return response.status(400).send({
            error: 'no such tasklist exists to remove the task from'
        })
    }
    // Remove the task
    await Task.findByIdAndDelete(taskId)
    // Update the tasklist
    tasklist.tasks = tasklist.tasks.filter(id => id.toJSON() !== taskId)
    await tasklist.save()
    // Return response
    response.status(204).send()
})


export default taskRouter;