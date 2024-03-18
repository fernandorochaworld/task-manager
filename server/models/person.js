const mongoose = require("mongoose");
const { collectionTransformation, opts } = require("../utils/mongoose-utils.js");

const PersonSchema = new mongoose.Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
});

PersonSchema.virtual('tasklists', {
    ref: 'tasklist',
    localField: '_id',
    foreignField: 'person_id'
}, opts);

PersonSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        collectionTransformation(document, returnedObject);
        delete returnedObject.passwordHash;
    }
});

module.exports = mongoose.model('person', PersonSchema);
