const express = require('express')
const apiRouter = require('./routes/api') // making the router to be required through the server.js section.
const app = express() // making the new express application for this sign in

const path = require('path') // it will join together all the files for the Azure

const staticFilePath = path.join(__dirname, 'clients', 'dist') // it will join together the client and the dist location.
const staticFiles = express.static(staticFilePath)
app.use('/',staticFiles) // this will serve the static files from the vue app.

app.use(express.json())

app.use('/api', apiRouter) //using the apiRouter.

app.use(function (req, res, next) {
    res.status(404).send('Sorry, this page was not found')
})

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).send('Server Not Found') // this will return an error for all parameters.
})

const server = app.listen(process.env.PORT || 3060, function() {
    console.log('Listening on port ' + server.address().port) // listening for the app in the console log. setting up as a variable.
})