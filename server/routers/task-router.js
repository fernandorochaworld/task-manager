import express from "express";

/**
 * Import mongoose models
 */
import TaskList from '../models/task-list.js'
import Task from '../models/task.js'

const taskRouter = express.Router()

taskRouter.get('/:personId/tasklist/:tasklistId/task', async (request, response) => {
    const tasklist_id = request.params.tasklistId
    const tasks = await Task.find({tasklist_id})
    response.json(tasks)
})

taskRouter.get('/:personId/tasklist/:tasklistId/task/:id', async (request, response) => {
    const {id: _id, tasklistId: tasklist_id} = request.params
    const task = await Task.findOne({_id, tasklist_id})
    response.json(task)
})

taskRouter.post('/:personId/tasklist/:tasklistId/task', async (request, response) => {
    // Get fields
    const {tasklistId, personId} = request.params;
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
        title, description, status, priority, dueDate, tasklist_id: tasklistId
    })
    const savedTask = await task.save()
    // Add the task to the tasklist, and save that!
    // tasklist.tasks = tasklist.tasks.concat(savedTask._id)
    // await tasklist.save()
    // Return the saved task
    return response.status(201).json(savedTask)
})

taskRouter.put('/:person_id/tasklist/:tasklist_id/task/:_id', async (request, response) => {
    // Get fields
    const {tasklist_id, person_id, _id} = request.params;

    const task = await Task.findOne({_id, tasklist_id})

    const { title, description, status, priority, dueDate } = request.body
    // Error handling
    if (!title || !status || !priority || !dueDate) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get tasklist
    const tasklist = await TaskList.findOne({_id: tasklist_id, person_id})
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

taskRouter.delete('/:person_id/tasklist/:tasklist_id/task/:_id', async (request, response) => {
    const {tasklist_id, person_id, _id} = request.params;

    const task = await Task.findOne({_id, tasklist_id})
    if (!task) {
        return response.status(400).send({
            error: 'Task not found'
        })
    }

    // Remove the task
    await task.deleteOne();
    
    // Return response
    response.status(204).send()
})


export default taskRouter;