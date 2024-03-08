import mongoose from "mongoose";
import { collectionTransformation } from "../utils/mongoose-utils.js";

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    // tasklists: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'task-list'
    //     }
    //   ]
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

// export const getPersons = () => PersonModel.find();
// export const getPersonByName = (name) => PersonModel.findOne({ name });
// export const getPersonById = (id) => PersonModel.findById(id);
// export const createPerson = (values) =>
//     new PersonModel(values).save().then(country => country.toObject());
// export const deletePersonById = (id) => PersonModel.findOneAndDelete({ _id: id });
// export const updatePersonById = (id, values) => PersonModel.findByIdAndUpdate(id, values);
