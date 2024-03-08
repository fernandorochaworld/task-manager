import mongoose from "mongoose";
import { collectionTransformation } from "../utils/mongoose-utils.js";

const TaskListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task'
        }
    ]
});

TaskListSchema.set('toJSON', {
    transform: collectionTransformation
});

export default mongoose.model('task-list', TaskListSchema);
