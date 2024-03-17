const mongoose = require("mongoose");
const { collectionTransformation, opts } = require("../utils/mongoose-utils.js");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: String }, //Date
    tasklist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasklist'
    }
}, opts);


TaskSchema.set('toJSON', {
    transform: collectionTransformation
});

module.exports = mongoose.model('task', TaskSchema);