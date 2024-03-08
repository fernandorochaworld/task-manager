import mongoose from "mongoose";
import { collectionTransformation } from "../utils/mongoose-utils.js";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date },
    tasklist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasklist'
    }
});


TaskSchema.set('toJSON', {
    transform: collectionTransformation
});

export default mongoose.model('task', TaskSchema);