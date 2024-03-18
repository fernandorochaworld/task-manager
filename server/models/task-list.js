const mongoose = require("mongoose");
const { collectionTransformation } = require("../utils/mongoose-utils.js");

const TaskListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'person'
    }
    // tasks: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'task'
    //     }
    // ]
});

TaskListSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'tasklist_id'
});

TaskListSchema.set('toJSON', {
    virtuals: true,
    transform: collectionTransformation
});

module.exports = mongoose.model('tasklist', TaskListSchema);
