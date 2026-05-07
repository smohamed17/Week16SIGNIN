const { Sequelize, DataTypes } = require('sequelize') // we are using the sequelize and datatypes to this index js file.
const configJson = require('../config.json') // this is referring to the config.json file that we've created in this application.
const createStudentModel = require('./student.js') // this will be referring the student.js file.

const env = process.env.NODE_ENV || "development" // we are creating an environment variable to be set into the computer, and it will run through the computer/server. It'll read through the value.

// this code will run through the development section of the config.json to find this variable through different development such as; Azure. Controlling the application.

const config = configJson[env] // if you're running through your computer, if there isn't node_ENV, it will use the default value of the index.js section of the code. It will also read the config of the production or development.

const sequelize = new Sequelize(config) // setting up a new sequelize as part of the config.

const database = { // reading out the two sequelize sections through the database.
    sequelize: sequelize,
    Sequelize: Sequelize,
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name // creating the student name from the student.js section.
database[studentModelName] = studentModel // this will be called through the studentModelName section as it will create the sequelize and datatypes created by 'studentModel'.

module.exports = database // setting the database and connect the sqlite to this.