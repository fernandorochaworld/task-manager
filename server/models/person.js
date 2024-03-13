import mongoose from "mongoose";
import { collectionTransformation } from "../utils/mongoose-utils.js";

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
});

PersonSchema.virtual('tasklists', {
    ref: 'tasklist',
    localField: '_id',
    foreignField: 'person_id'
});

PersonSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        collectionTransformation(document, returnedObject);
        delete returnedObject.passwordHash;
    }
});

export default mongoose.model('person', PersonSchema);
