import mongoose from "mongoose";
import { collectionTransformation } from "../utils/mongoose-utils";

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    taskLists: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'task-list'
        }
      ]
});


PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        collectionTransformation(document, returnedObject);
        delete returnedObject.passwordHash;
    }
});

export const PersonModel = mongoose.model('person', PersonSchema);

// export const getPersons = () => PersonModel.find();
// export const getPersonByName = (name) => PersonModel.findOne({ name });
// export const getPersonById = (id) => PersonModel.findById(id);
// export const createPerson = (values) =>
//     new PersonModel(values).save().then(country => country.toObject());
// export const deletePersonById = (id) => PersonModel.findOneAndDelete({ _id: id });
// export const updatePersonById = (id, values) => PersonModel.findByIdAndUpdate(id, values);
