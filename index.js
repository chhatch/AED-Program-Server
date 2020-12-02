const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const testRouter = require('./testRoute/router')
const userRouter = require('./user/route')
const connectDB = require('./db/mongoose')

//wrapping the whole thing in a self-executing function to await
;(async () => {
    //connect to mongo db
    try {
        console.log('connecting to db..')
        await connectDB()
        console.log('connected to db.')
    } catch (e) {
        console.log(e)
    }

    app.options('*', cors()) //this handles preflight requests
    app.use(cors())
    app.use('/test', testRouter)
    app.use('/user', userRouter)
    http.createServer(app).listen(5000, () => {
        console.log('Listening on port 5000...')
    })
})()
