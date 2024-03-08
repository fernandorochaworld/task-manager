import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date },
});


TaskSchema.set('toJSON', {
    transform: collectionTransformation
});

export const TaskModel = mongoose.model('task', TaskSchema);