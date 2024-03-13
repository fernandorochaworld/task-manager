import bcrypt from 'bcryptjs'
import Person from "../models/person.js";
import { closeConnection, dbConnect } from "./db.js";
import dotenv from 'dotenv';
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