const bcrypt = require('bcryptjs');
const Person = require("../models/person.js");
const { closeConnection, dbConnect } = require("./db.js");
const dotenv = require('dotenv');
dotenv.config();


let users = [
    {username: 'admin', passwordHash: await bcrypt.hash('admin', 10)},
    {username: 'test', passwordHash: await bcrypt.hash('test', 10)},
    {username: 'aux', passwordHash: await bcrypt.hash('aux', 10)},
];


try {
    await dbConnect();
    await Person.insertMany(users)
        .then(() => {
            console.log('Successful bulk insertion')
        })
} catch (error) {
    console.log('error:', error)
}

closeConnection();