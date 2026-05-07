const express = require('express')
const database = require('../models') // this will be looking for the index.js file and the database section.
const Student = database.Student // the student model to be called out.

const router = express.Router()

router.get('/students', function (req, res, next) {
    Student.findAll({ order: ['name'] }).then(students => { // we can sort it through by name or starID.
        return res.json(students) // this will get all the rows from the database and converting this to a json by calling it through a function.
    })
})

router.post('/students', function (req, res, next) {
    const newStudent = req.body // the client will send request and sending a json data.
    console.log(newStudent)
    Student.create(newStudent).then( result => { // this will send the req to add a new student and returns a promise.
        return res.status(201).send('New Student Created') // this will return as a status and using 201 that it was created. it will send a message afterward.
    }).catch(err => { // this is sending out an error based on situation. like missing name, starID.
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        } else {
            next(err) // this happens when the req and the res cannot handle the database. the Next will appear next.
        }
    })
})

router.patch('/students/:id', function (req, res, next) {
    const studentID = req.params.id // it will store the req.params to the value of the ID.
    const updatedStudent = req.body // updating the student in real time.
    console.log(updatedStudent) // using the console.log to capture the updatedStudent const.
    Student.update(updatedStudent, { where: { id: studentID } }).then( (result) => { // this will then use the location of the id and send out an 'ok' to the request.
        res.send('ok') // it will match up the data.

        const rowModified = result[0] // if a row was changed during the updated student option. it will create a change.
        if (rowModified === 1) {
            return res.send('ok')
        } else { // it will not exist in the student update list.
            return res.status(404).send('Could not find student')
        }

    }).catch(err => { // catching any errors such as; database errors of the code or cannot connect to the database.
        if (err instanceof database.Sequelize.ValidationError) { // this will go through a process where if an error occurs on the code, it will feed back to the console for the user to figure out.
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages) // 400 is the bad request message.
        } else {
            next(err)
        }
    })

})// this will capture and match up the requests coming from the website.

router.delete('/students/:id', function (req, res, next) {
    const studentID = req.params.id // we are requesting a deleted to the student id.
    Student.destroy({ where: { id: studentID } } ).then ( rowDeleted => {
        if (rowDeleted === 1) { // if it was one or more students delete it will appear.
            return res.send('Student deleted')
        } else {
            return res.status(404).send('Could not find student') // this will appear if the student doesn't exist or less than 1.
        }
    }).catch(err => { // this will catch any errors that appears on this code.
        return next(err)
    })
})


module.exports = router