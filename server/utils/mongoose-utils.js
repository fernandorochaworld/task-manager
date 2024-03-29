
const opts = { toJSON: { virtuals: true } };

const collectionTransformation = (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
}

module.exports = {
    opts,
    collectionTransformation
}